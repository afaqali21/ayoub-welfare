import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------- In-Memory Database Fallback for Vercel ----------
class InMemoryDb {
  constructor() {
    this.admins = [];
    this.projects = [];
    this.updates = [];
    this.updateIdCounter = 1;

    // Seed default admin synchronously to prevent race conditions during serverless startup
    try {
      const hashed = bcryptjs.hashSync('admin123', 10);
      this.admins.push({
        id: 'admin-id-default',
        username: 'admin',
        password: hashed,
        email: 'admin@ayoubwelfare.org'
      });
    } catch (e) {
      console.error('Failed to seed default admin in memory:', e);
    }
  }

  exec(sql) {
    // No-op for creating tables in memory
  }

  prepare(sql) {
    const normalizedSql = sql.trim().replace(/\s+/g, ' ');

    return {
      get: (...args) => {
        // SELECT 1 FROM admins WHERE username = ?
        if (normalizedSql.includes('SELECT 1 FROM admins WHERE username = ?')) {
          const username = args[0];
          const exists = this.admins.some(a => a.username === username);
          return exists ? { 1: 1 } : undefined;
        }
        // SELECT * FROM admins WHERE username = ?
        if (normalizedSql.includes('SELECT * FROM admins WHERE username = ?')) {
          const username = args[0];
          return this.admins.find(a => a.username === username);
        }
        // SELECT * FROM projects WHERE id = ?
        if (normalizedSql.includes('SELECT * FROM projects WHERE id = ?')) {
          const id = args[0];
          return this.projects.find(p => p.id === id);
        }
        // SELECT COUNT(*) AS cnt FROM projects
        if (normalizedSql.includes('SELECT COUNT(*) AS cnt FROM projects')) {
          return { cnt: this.projects.length };
        }
        console.warn('Unhandled GET SQL:', sql, args);
        return undefined;
      },

      all: (...args) => {
        // SELECT * FROM updates WHERE projectId = ? ORDER BY id
        if (normalizedSql.includes('SELECT * FROM updates WHERE projectId = ? ORDER BY id')) {
          const projectId = args[0];
          return this.updates.filter(u => u.projectId === projectId).sort((a, b) => a.id - b.id);
        }
        // SELECT * FROM projects
        if (normalizedSql.includes('SELECT * FROM projects')) {
          return this.projects;
        }
        console.warn('Unhandled ALL SQL:', sql, args);
        return [];
      },

      run: (...args) => {
        // INSERT INTO admins (id, username, password, email) VALUES (?, ?, ?, ?)
        if (normalizedSql.includes('INSERT INTO admins')) {
          const [id, username, password, email] = args;
          this.admins.push({ id, username, password, email });
          return { lastInsertRowid: this.admins.length };
        }
        // INSERT INTO projects (id, donorName, donorEmail, type, location, amount, currency, description, customInfo, startDate, status, createdAt)
        if (normalizedSql.includes('INSERT INTO projects')) {
          const [id, donorName, donorEmail, type, location, amount, currency, description, customInfo, startDate, status, createdAt] = args;
          this.projects.push({ id, donorName, donorEmail, type, location, amount, currency, description, customInfo, startDate, status, createdAt });
          return { lastInsertRowid: id };
        }
        // INSERT INTO updates (projectId, date, title, body, images) VALUES (?, ?, ?, ?, ?)
        if (normalizedSql.includes('INSERT INTO updates')) {
          const [projectId, date, title, body, images] = args;
          const newId = this.updateIdCounter++;
          this.updates.push({ id: newId, projectId, date, title, body, images });
          return { lastInsertRowid: newId };
        }
        // UPDATE projects SET status = ? WHERE id = ?
        if (normalizedSql.includes('UPDATE projects SET status = ? WHERE id = ?')) {
          const [status, id] = args;
          const project = this.projects.find(p => p.id === id);
          if (project) {
            project.status = status;
          }
          return { changes: 1 };
        }
        // DELETE FROM projects WHERE id = ?
        if (normalizedSql.includes('DELETE FROM projects WHERE id = ?')) {
          const id = args[0];
          this.projects = this.projects.filter(p => p.id !== id);
          this.updates = this.updates.filter(u => u.projectId !== id);
          return { changes: 1 };
        }
        console.warn('Unhandled RUN SQL:', sql, args);
        return { lastInsertRowid: 0, changes: 0 };
      }
    };
  }
}

// ---------- SQLite / Fallback Setup ----------
let db;
if (process.env.VERCEL) {
  console.log('ℹ️ Running on Vercel. Initializing in-memory database fallback.');
  db = new InMemoryDb();
} else {
  try {
    const Database = (await import('better-sqlite3')).default;
    db = new Database(process.env.DB_PATH || './data.db');
  } catch (err) {
    console.error('⚠️ Failed to load better-sqlite3, falling back to in-memory database:', err.message);
    db = new InMemoryDb();
  }
}

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  donorName TEXT NOT NULL,
  donorEmail TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT,
  amount REAL NOT NULL,
  currency TEXT,
  description TEXT,
  customInfo TEXT,
  startDate TEXT,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projectId TEXT NOT NULL,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  images TEXT, -- JSON string of [{url, caption}]
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE
);
`);

// Ensure a default admin exists
(async () => {
  const adminExists = db.prepare('SELECT 1 FROM admins WHERE username = ?').get('admin');
  if (!adminExists) {
    const hashed = await bcryptjs.hash('admin123', 10);
    db.prepare('INSERT INTO admins (id, username, password, email) VALUES (?, ?, ?, ?)')
      .run(uuidv4(), 'admin', hashed, 'admin@ayoubwelfare.org');
    console.log('✅ Default admin created (username=admin, password=admin123)');
  }
})();

// ---------- Multer Setup ----------
const uploadDir = process.env.VERCEL ? '/tmp/uploads' : path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

app.use('/uploads', express.static(uploadDir));

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Construct absolute URL using server host (without /api prefix)
  const host = process.env.SERVER_URL || `http://localhost:${PORT}`;
  const fullUrl = `${host}/uploads/${req.file.filename}`;
  res.json({ url: fullUrl });
});

// ---------- Helpers ----------
function generateProjectId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 900) + 100;
  return `AWC-${year}-${month}-${random}`;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
  } catch {
    return null;
  }
}

function getProjectWithUpdates(projectId) {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
  if (!project) return null;
  // parse JSON fields
  project.customInfo = project.customInfo ? JSON.parse(project.customInfo) : {};
  const updates = db.prepare('SELECT * FROM updates WHERE projectId = ? ORDER BY id').all(projectId);
  project.updates = updates.map(u => ({
    id: u.id,
    date: u.date,
    title: u.title,
    body: u.body,
    images: u.images ? JSON.parse(u.images) : []
  }));
  return project;
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

async function sendEmail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@ayoubwelfare.org',
      to,
      subject,
      html
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email failed for ${to}:`, err.message);
  }
}

// ---------- Auth ----------
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcryptjs.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || 'your-secret-key-change-this', { expiresIn: '7d' });
  res.json({ token, admin: { id: admin.id, username: admin.username, email: admin.email } });
});

// ---------- Project Endpoints ----------
app.post('/api/projects', async (req, res) => {
  try {
    const { donorName, donorEmail, type, location, amount, currency, description, customInfo } = req.body;
    if (!donorName || !donorEmail || !type || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const projectId = generateProjectId();
    const now = new Date();
    const startDate = now.toISOString().slice(0, 10);
    const createdAt = now.toISOString();
    db.prepare(`INSERT INTO projects (id, donorName, donorEmail, type, location, amount, currency, description, customInfo, startDate, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        projectId,
        donorName,
        donorEmail,
        type,
        location || 'To be determined',
        amount,
        currency || 'GBP',
        description || `${type} project funded by generous donor`,
        JSON.stringify(customInfo || {}),
        startDate,
        'pending',
        createdAt
      );
    // Initial update entry
    db.prepare(`INSERT INTO updates (projectId, date, title, body, images) VALUES (?, ?, ?, ?, ?)`)
      .run(projectId, startDate, 'Project Initiated', 'Your donation has been received and we are planning the implementation. You will receive updates as work progresses.', JSON.stringify([]));

    const trackingLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donor-project-tracker?id=${projectId}`;
    const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
<h2 style="color: #16a34a;">🌿 Thank you for your donation!</h2>
<p>Dear ${donorName},</p>
<p>We have received your generous donation of <strong>£${amount}</strong> for <strong>${type}</strong>.</p>
<p>Your project reference ID is: <strong>${projectId}</strong></p>
<p style="margin-top: 20px;"><a href="${trackingLink}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Track Your Project</a></p>
<p>You can use the link above to track the progress of your project. We will send you updates as work progresses.</p>
<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
<p style="color: #666; font-size: 12px;">Ayoub Welfare CIC - Your donation is an Amanah</p>
</div>`;
    await sendEmail(donorEmail, `Project Created - Reference: ${projectId}`, emailHtml);

    const createdProject = getProjectWithUpdates(projectId);
    res.status(201).json(createdProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.get('/api/projects', (req, res) => {
  const rows = db.prepare('SELECT * FROM projects').all();
  const projects = rows.map(p => {
    const proj = { ...p, customInfo: p.customInfo ? JSON.parse(p.customInfo) : {} };
    proj.updates = db.prepare('SELECT * FROM updates WHERE projectId = ? ORDER BY id').all(p.id).map(u => ({
      id: u.id,
      date: u.date,
      title: u.title,
      body: u.body,
      images: u.images ? JSON.parse(u.images) : []
    }));
    return proj;
  });
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = getProjectWithUpdates(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

app.post('/api/projects/:id/updates', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' });

  const { title, body, images, imageUrl, imageCaption } = req.body;
  const proj = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Project not found' });
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });

  const imgArray = images || (imageUrl ? [{ url: imageUrl, caption: imageCaption || 'Project photo' }] : []);
  const info = db.prepare('INSERT INTO updates (projectId, date, title, body, images) VALUES (?, ?, ?, ?, ?)')
    .run(req.params.id, new Date().toISOString().slice(0, 10), title, body, JSON.stringify(imgArray));
  const newUpdate = { id: info.lastInsertRowid, date: new Date().toISOString().slice(0, 10), title, body, images: imgArray };

  // Email to donor
  const donorEmail = proj.donorEmail;
  const donorName = proj.donorName;
  const trackingLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donor-project-tracker?id=${proj.id}`;
  const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
<h2 style="color: #16a34a;">📢 Project Update - ${proj.id}</h2>
<p>Dear ${donorName},</p>
<p>There's a new update on your project:</p>
<h3 style="color: #111827;">${title}</h3>
<p>${body}</p>
<p style="margin-top: 20px;"><a href="${trackingLink}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Full Update</a></p>
</div>`;
  sendEmail(donorEmail, `Update: ${title}`, emailHtml);

  res.json(newUpdate);
});

app.patch('/api/projects/:id/status', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' });
  const { status } = req.body;
  if (!['pending', 'in_progress', 'completed'].includes(status)) return res.status(400).json({ error: 'Invalid status' });

  const proj = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Project not found' });
  const oldStatus = proj.status;
  db.prepare('UPDATE projects SET status = ? WHERE id = ?').run(status, req.params.id);

  let subject = '';
  let message = '';
  if (status === 'in_progress') {
    subject = `We've started working on your project! - ${proj.id}`;
    message = `Great news! We have started working on your ${proj.type} project. You will receive regular updates as we progress.`;
  } else if (status === 'completed') {
    subject = `Your project is complete! - ${proj.id}`;
    message = `Excellent news! Your ${proj.type} project has been successfully completed and is now serving the community.`;
  }
  if (subject && message) {
    const trackingLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/donor-project-tracker?id=${proj.id}`;
    const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
<h2 style="color: #16a34a;">✅ Project Status Update</h2>
<p>Dear ${proj.donorName},</p>
<p>${message}</p>
<p style="margin-top: 20px;"><a href="${trackingLink}" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Project</a></p>
</div>`;
    sendEmail(proj.donorEmail, subject, emailHtml);
  }

  const updatedProject = getProjectWithUpdates(req.params.id);
  res.json({ ...updatedProject, message: `Status updated from ${oldStatus} to ${status}` });
});

app.delete('/api/projects/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyToken(token)) return res.status(401).json({ error: 'Unauthorized' });

  const proj = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Project not found' });

  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ message: 'Project successfully deleted', id: req.params.id });
});


app.get('/api/health', (req, res) => {
  const count = db.prepare('SELECT COUNT(*) AS cnt FROM projects').get().cnt;
  res.json({ status: 'ok', projects: count });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Ayoub Welfare Backend running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured (update .env)'}`);
    console.log(`🔐 Admin login: username=admin, password=admin123`);
  });
}

export default app;
