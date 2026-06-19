# Ayoub Welfare Donor Project Tracker - Complete Setup Guide

## 🎯 Overview

This is a complete donation and project tracking system with:
- ✅ Multi-step donation form with donor info collection
- ✅ Auto project creation when donors submit
- ✅ Email notifications to donors with tracking links
- ✅ Donor tracking portal to view project progress
- ✅ Secure admin panel to manage projects
- ✅ Real-time project updates with photos
- ✅ Status tracking (pending → in_progress → completed)

## 📋 Prerequisites

- Node.js 16+ 
- npm or bun
- Gmail account (for email notifications)

## 🚀 Quick Setup

### Step 1: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `.env` file:**
```
PORT=5000
JWT_SECRET=your-super-secret-key-change-this
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**Get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy it to `EMAIL_PASSWORD` in `.env`

**Start Backend:**
```bash
npm run dev  # Development with auto-reload
# OR
npm start   # Production
```

Backend will run on `http://localhost:5000`

### Step 2: Frontend Setup

```bash
npm install
# Configure backend URL (should already be in .env.local)
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📱 Using the System

### For Donors:

1. Go to `/donate`
2. Select a cause and amount
3. Enter name and email
4. Submit to create project
5. Receive confirmation email with tracking link
6. Click link to track project progress

### For Admins:

1. Go to `/donor-project-tracker`
2. Click "Admin Panel" tab
3. Login with:
   - Username: `admin`
   - Password: `admin123`
4. Click any project to:
   - Add progress updates with photos
   - Mark project as complete
   - Change project status

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/projects/:id` - Get project details by ID
- `POST /api/projects` - Create new project

### Admin Endpoints (Requires JWT Token)
- `POST /api/auth/login` - Get JWT token
- `GET /api/projects` - List all projects
- `POST /api/projects/:id/updates` - Add project update
- `PATCH /api/projects/:id/status` - Update project status

## 📧 Email Notifications

Donors receive emails at:
- **Project creation**: Confirmation + tracking link
- **Project status update**: When status changes (in_progress/completed)
- **New project update**: When admin adds progress update

## 🛡️ Security

⚠️ **Before Production:**
1. Change default admin password
2. Update `JWT_SECRET` to a strong random string
3. Store `.env` securely (never commit to git)
4. Use HTTPS for all connections
5. Implement rate limiting
6. Add database for persistent storage

## 🗄️ Database Options

Currently using in-memory storage (data lost on restart). To persist data:

### MongoDB
```bash
npm install mongodb
# Update backend to use MongoDB
```

### PostgreSQL
```bash
npm install pg
# Update backend to use PostgreSQL
```

### Supabase (Recommended for beginners)
```bash
# Sign up at supabase.com
# Get connection string from Supabase dashboard
# Update backend to use Supabase
```

## 📱 Project Structure

```
ayoub-legacy-aid/
├── src/
│   ├── pages/
│   │   ├── Donate.tsx          # Donation form
│   │   └── DonorProjectTracker.jsx  # Tracking portal + admin panel
│   └── lib/
│       └── api-service.ts       # API communication
├── backend/
│   ├── src/
│   │   └── server.js           # Express server
│   ├── package.json
│   ├── .env                    # Configuration (DO NOT COMMIT)
│   └── .env.example            # Configuration template
└── .env.local                  # Frontend config
```

## 🐛 Troubleshooting

**Backend won't start?**
- Check port 5000 is free: `lsof -i :5000` or `netstat -ano | findstr :5000`
- Verify Node.js installed: `node --version`

**Emails not sending?**
- Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- Verify Gmail app-specific password is 16 characters
- Check email isn't in spam folder
- Enable "Less secure app access" if not using app-specific password

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` in `.env.local`
- Check backend is running on correct port
- Ensure CORS is enabled (backend already configured)

**Admin login fails?**
- Default: username=`admin`, password=`admin123`
- Check `JWT_SECRET` in `.env` is set

## 📚 Next Steps

1. Test donation flow
2. Check email notifications
3. Test admin panel
4. Add real database
5. Deploy to production
6. Add payment processing (Stripe/SumUp)
7. Add SMS notifications

## 📞 Support

For issues:
1. Check `.env` is correctly configured
2. Verify both frontend and backend are running
3. Check browser console for errors
4. Check terminal for backend errors

## 📝 Notes

- Donations currently go to mock backend (no real payment processing yet)
- Add payment gateway integration in `Donate.tsx`
- Update admin credentials in `backend/src/server.js`
- Use real database before production
