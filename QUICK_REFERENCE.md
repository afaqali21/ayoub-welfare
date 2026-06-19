# 🚀 Quick Reference Card

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Ayoub Welfare - Donor Project Tracker System              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend (React + TypeScript)   Backend (Node + Express) │
│  http://localhost:5173           http://localhost:5000     │
│  ├─ Donate page                  ├─ Project API           │
│  ├─ Donor tracker                ├─ Auth (JWT)            │
│  └─ Admin panel                  ├─ Email service         │
│                                  └─ Status management     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start (2 Minutes)

```bash
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your Gmail app password
npm run dev

# Terminal 2 - Frontend
npm install
npm run dev
```

Then open: http://localhost:5173/donate

---

## 📋 Configuration Checklist

- [ ] Backend `.env` created from `.env.example`
- [ ] `JWT_SECRET` set to a random string
- [ ] `EMAIL_USER` set to your Gmail
- [ ] `EMAIL_PASSWORD` set to 16-char app password
- [ ] `FRONTEND_URL` set to http://localhost:5173
- [ ] Frontend `.env.local` has `VITE_API_URL=http://localhost:5000/api`
- [ ] Both servers running without errors

---

## 🧪 Test Credentials

**Admin Panel:**
- Username: `admin`
- Password: `admin123`

---

## 📱 URL Routes

| Route | Purpose | Access |
|-------|---------|--------|
| `/donate` | Donation form | Public |
| `/donor-project-tracker` | Tracking portal | Public |
| `/donor-project-tracker?id=AWC-2024-001` | Direct project link | Public |
| `/` | Home page | Public |

---

## 🔌 API Endpoints

**Public:**
- `POST /api/projects` - Create donation
- `GET /api/projects/:id` - Get project

**Admin (requires JWT token):**
- `POST /api/auth/login` - Login
- `GET /api/projects` - List all
- `POST /api/projects/:id/updates` - Add update
- `PATCH /api/projects/:id/status` - Change status

---

## 📧 Email Events

Donors receive emails when:
1. ✉️ Donation created (confirmation + tracking link)
2. 📢 Status changes (pending → in_progress → completed)
3. 🔔 New update added (admin posts progress)

---

## 🛠️ Common Tasks

### Add New Admin User
Edit `backend/src/server.js`:
```javascript
admins.push({
  id: uuidv4(),
  username: 'newadmin',
  password: await bcryptjs.hash('newpassword', 10),
  email: 'admin@example.com',
});
```

### Change Email Template
Edit email HTML in `backend/src/server.js`:
- Search: `emailHtml`
- Update HTML content
- Test by creating donation

### Check Project Status
Backend console shows all projects:
- Open browser DevTools
- Check Network tab for API calls
- See project objects in responses

---

## 🐛 Debug Tips

**Enable verbose logging:**
```javascript
// In backend/src/server.js
console.log('Project created:', newProject);
console.log('Email sent to:', donorEmail);
```

**Check network requests:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Create a donation
4. Watch API calls in real-time

**Verify emails:**
1. Check Gmail spam folder
2. Verify sender email in `.env`
3. Check Gmail app-specific password

---

## 📊 Project Status Flow

```
Donation Created
       ↓
   pending ← Status starts here
       ↓
 in_progress ← Admin clicks "Mark In Progress"
       ↓
  completed ← Admin clicks "Mark Complete"
       ↓
  Done! ✅
```

---

## 💾 Data Storage

Currently: **In-memory** (resets on server restart)

To persist:
1. Add MongoDB or PostgreSQL
2. Update backend database logic
3. Data survives server restarts

---

## 🔐 Security Checklist

Before production:
- [ ] Change `JWT_SECRET`
- [ ] Change admin credentials
- [ ] Add HTTPS
- [ ] Add database
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Test with real payments

---

## 📞 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 in use | `netstat -ano \| findstr :5000` then kill process |
| Emails not sending | Check EMAIL_USER/EMAIL_PASSWORD, check spam folder |
| Backend connection error | Verify VITE_API_URL, check CORS |
| Admin login fails | Check JWT_SECRET is set, verify credentials |
| Projects disappear | Use database instead of in-memory storage |

---

## 📚 Documentation

- `SETUP_GUIDE.md` - Detailed setup
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `backend/README.md` - Backend docs
- This file - Quick reference

---

## ✨ Key Features

✅ Multi-step donation form  
✅ Email notifications  
✅ Donor tracking portal  
✅ Secure admin panel  
✅ Project timeline  
✅ Status tracking  
✅ Photo uploads  
✅ Mobile responsive  

---

## 🎯 What's Next?

1. Test the full donation flow
2. Verify emails are being sent
3. Test admin dashboard
4. Add payment processing (optional)
5. Deploy to production
6. Add real database

---

## 💡 Pro Tips

- Use `.env.example` to document all config options
- Test emails go to test account first
- Use mock data for testing before payment integration
- Keep `.env` files in `.gitignore`
- Monitor server logs while testing

---

**System Status: ✅ Ready to Use**

Questions? Check the detailed guides or server logs for more info.
