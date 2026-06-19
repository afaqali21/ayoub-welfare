# Ayoub Welfare Backend

Backend server for the Donor Project Tracker system.

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update these fields:
- `JWT_SECRET`: Change to a secure random string
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: [Get an app-specific password](https://myaccount.google.com/apppasswords)
- `FRONTEND_URL`: Your frontend URL (default: http://localhost:5173)

### 3. Run the Server

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
  - Body: `{ username, password }`
  - Returns: `{ token, admin }`

### Projects
- `POST /api/projects` - Create new project (from donation)
  - Body: `{ donorName, donorEmail, type, location, amount, currency, description }`
  - Returns: Project object

- `GET /api/projects` - Get all projects (admin)
  - Requires: Admin auth token
  - Returns: Array of projects

- `GET /api/projects/:id` - Get project by ID (public)
  - Returns: Project object

- `POST /api/projects/:id/updates` - Add update to project (admin)
  - Requires: Admin auth token
  - Body: `{ title, body, imageUrl?, imageCaption? }`
  - Returns: Update object

- `PATCH /api/projects/:id/status` - Update project status (admin)
  - Requires: Admin auth token
  - Body: `{ status: "pending" | "in_progress" | "completed" }`
  - Returns: Updated project

### Health
- `GET /api/health` - Server health check

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

⚠️ Change these in production!

## Email Configuration

Using Gmail:
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Create an app-specific password for "Mail"
3. Copy the 16-character password to `EMAIL_PASSWORD` in `.env`

## Database (Future)

Currently using in-memory storage. To add persistent storage:

### Option 1: MongoDB
```bash
npm install mongodb
```

### Option 2: PostgreSQL
```bash
npm install pg
```

### Option 3: Supabase (easiest for beginners)
- Create account at [supabase.com](https://supabase.com)
- Get connection string and update `DATABASE_URL`

## Project Structure

```
backend/
├── src/
│   └── server.js       # Main Express app
├── package.json        # Dependencies
├── .env               # Environment config (create from .env.example)
└── .env.example       # Environment template
```

## Troubleshooting

**Email not sending?**
- Check `EMAIL_USER` and `EMAIL_PASSWORD` are correct
- Enable "Less secure app access" or use app-specific password
- Check spam folder

**Admin login fails?**
- Verify `JWT_SECRET` is set in `.env`
- Default credentials: admin / admin123

**Port already in use?**
- Change `PORT` in `.env` or kill process on that port
