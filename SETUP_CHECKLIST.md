# ✅ Setup Checklist

Complete this checklist to ensure everything is working properly.

## Phase 1: Environment Setup ⚙️

### Prerequisites
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm or bun package manager available
- [ ] Gmail account ready
- [ ] Text editor or IDE open

### Backend Environment
- [ ] Created `/backend/.env` from `.env.example`
- [ ] Set `JWT_SECRET` to a random string
- [ ] Got Gmail app password from https://myaccount.google.com/apppasswords
- [ ] Set `EMAIL_USER` to your Gmail address
- [ ] Set `EMAIL_PASSWORD` to 16-char app password
- [ ] Set `FRONTEND_URL=http://localhost:5173`
- [ ] Set `PORT=5000` (or your preferred port)

### Frontend Environment  
- [ ] Checked `.env.local` has `VITE_API_URL=http://localhost:5000/api`
- [ ] Or updated with your backend URL if different

---

## Phase 2: Installation 📦

### Backend
- [ ] `cd backend`
- [ ] `npm install` completed without errors
- [ ] All dependencies installed (check `node_modules` exists)

### Frontend
- [ ] `cd ..` (back to project root)
- [ ] `npm install` completed without errors
- [ ] All dependencies installed (check `node_modules` exists)

---

## Phase 3: Running the System 🚀

### Backend Server
- [ ] Opened Terminal 1
- [ ] Navigated to backend: `cd backend`
- [ ] Ran: `npm run dev`
- [ ] See message: "🚀 Ayoub Welfare Backend running on http://localhost:5000"
- [ ] No error messages in console

### Frontend Server
- [ ] Opened Terminal 2 (keep Terminal 1 running)
- [ ] Navigated to project root
- [ ] Ran: `npm run dev`
- [ ] See message showing localhost:5173
- [ ] Frontend loaded in browser

### Verification
- [ ] Backend: `http://localhost:5000/api/health` returns `{"status":"ok"}`
- [ ] Frontend: `http://localhost:5173` loads without errors
- [ ] Both servers running simultaneously

---

## Phase 4: Testing Donor Flow 👤

### Step 1: Access Donation Page
- [ ] Navigated to `http://localhost:5173/donate`
- [ ] Page loads with cause selection
- [ ] All 5 causes visible (Water, Food, Medical, Education, General)

### Step 2: Select Donation Details
- [ ] Selected a cause (e.g., Water)
- [ ] Selected an amount (e.g., £50)
- [ ] Clicked "Continue" button
- [ ] Form advanced to donor info step

### Step 3: Enter Donor Information
- [ ] Entered full name (e.g., "Test Donor")
- [ ] Entered email address (your real email)
- [ ] Both fields accepted input
- [ ] "Donate £X" button visible

### Step 4: Submit Donation
- [ ] Clicked "Donate" button
- [ ] Button showed loading state briefly
- [ ] No errors appeared
- [ ] Success screen displayed with project ID

### Step 5: Verify Success Screen
- [ ] Project reference ID visible (e.g., AWC-2024-001)
- [ ] Donation amount shown (£50)
- [ ] Project type shown (Water, etc.)
- [ ] Links to track project visible

### Step 6: Check Email
- [ ] Received email from noreply@ayoubwelfare.org
- [ ] Email contains project reference ID
- [ ] Email has "Track Your Project" button
- [ ] Email contains tracking link
- [ ] Check both Inbox and Spam folder

---

## Phase 5: Testing Tracker Access 👁️

### Direct Link from Email
- [ ] Clicked link in email (or copy the full link)
- [ ] Navigated to `/donor-project-tracker?id=...`
- [ ] Project loaded automatically
- [ ] Project details visible
- [ ] Timeline with initial update visible

### Manual Lookup
- [ ] Went to `http://localhost:5173/donor-project-tracker`
- [ ] Saw "Track Your Project" section
- [ ] Entered project reference ID (e.g., AWC-2024-001)
- [ ] Clicked "Track" button
- [ ] Same project loaded
- [ ] No error message

### Project Page Verification
- [ ] Project reference ID displayed
- [ ] Project status shown (Planned)
- [ ] Project description visible
- [ ] Timeline visible with updates
- [ ] Initial "Project Initiated" update shown

---

## Phase 6: Testing Admin Panel 👨‍💼

### Admin Login
- [ ] Clicked "Admin Panel" tab on tracker page
- [ ] Login form appeared
- [ ] Entered username: `admin`
- [ ] Entered password: `admin123`
- [ ] Clicked "Login" button
- [ ] No error message
- [ ] Admin panel loaded

### Admin Dashboard
- [ ] Saw green confirmation: "✅ Logged in as admin"
- [ ] "Logout" button visible
- [ ] All projects displayed as cards
- [ ] Test project from donation visible in list

### Add Project Update
- [ ] Clicked on any project
- [ ] Project detail page opened
- [ ] "Add Progress Update" button visible
- [ ] Clicked "Add Update" to expand form
- [ ] Form appeared with fields:
  - [ ] Update Title input
  - [ ] Details textarea
  - [ ] Photo URL input (optional)
  - [ ] Photo Caption input
  - [ ] "Post Update" button

### Post an Update
- [ ] Entered title (e.g., "Construction Started")
- [ ] Entered details (e.g., "Work began on-site today")
- [ ] Entered photo URL (optional): `https://placehold.co/600x400?text=Photo`
- [ ] Entered photo caption
- [ ] Clicked "Post Update"
- [ ] Form cleared
- [ ] No errors

### Verify Update Posted
- [ ] Update appeared in timeline below
- [ ] Update shows correct date
- [ ] Update title visible
- [ ] Update description visible  
- [ ] Photo visible (if added)
- [ ] Update at bottom of timeline

### Check Update Email
- [ ] Received email notification
- [ ] Email subject: "Update: Construction Started"
- [ ] Email contains update details
- [ ] Email has link to view full update

### Change Project Status
- [ ] Clicked "Mark Complete ✅" button on project card
- [ ] Or on project detail, changed status via dropdown (if available)
- [ ] Waited for loading
- [ ] Status changed to "Completed"
- [ ] Green success indicator appeared

### Status Change Email
- [ ] Received email notification
- [ ] Email subject: "Your project is complete!"
- [ ] Email contains completion message
- [ ] Donor email received confirmation

---

## Phase 7: Advanced Testing 🧪

### Multiple Projects
- [ ] Went back to donate page
- [ ] Created another donation with different details
- [ ] Verify different project ID created
- [ ] Admin can see both projects

### Admin Logout
- [ ] Clicked "Logout" button
- [ ] Returned to donor view
- [ ] Admin panel not accessible without login

### Security
- [ ] Admin panel requires login (can't access directly)
- [ ] Invalid credentials rejected
- [ ] JWT token stored in browser storage

---

## Phase 8: Browser DevTools Check 🔍

### Network Tab
- [ ] Opened DevTools (F12)
- [ ] Went to Network tab
- [ ] Created a donation
- [ ] Saw `POST /api/projects` request
- [ ] Response had `id`, `status`, `updates` fields
- [ ] Response status 201 (created)

### Console Tab
- [ ] Opened Console tab
- [ ] No red errors (warnings OK)
- [ ] Successfully logged requests visible (if logging enabled)

### Application/Storage Tab
- [ ] Opened Application tab
- [ ] Check Local Storage
- [ ] After admin login, saw `adminToken` stored
- [ ] Token is JWT format (has dots)

---

## Phase 9: Backend Health Check 🏥

### API Endpoints
- [ ] Visited `http://localhost:5000/api/health`
- [ ] See response: `{"status":"ok","projects":X}`
- [ ] Number of projects matches created donations

### No Errors in Backend Console
- [ ] Backend terminal shows no red errors
- [ ] Email sending confirmations visible
- [ ] API request logs showing activity

---

## Phase 10: Documentation Check 📚

- [ ] Found and read [QUICK_REFERENCE.md](../QUICK_REFERENCE.md)
- [ ] Found [SETUP_GUIDE.md](../SETUP_GUIDE.md)
- [ ] Found [IMPLEMENTATION_SUMMARY.md](../IMPLEMENTATION_SUMMARY.md)
- [ ] Bookmarked for future reference
- [ ] Understood system architecture from docs

---

## ✅ All Tests Passing!

If you've checked all boxes above:

✅ **System is working correctly!**

You can now:
- ✨ Accept real donations
- 📧 Send email notifications
- 👀 Track projects
- 👨‍💼 Manage from admin panel
- 🚀 Deploy to production (with security updates)

---

## 🔄 Post-Testing Tasks

### Important Before Production
- [ ] Change admin password in `backend/src/server.js`
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Update `.env` with production values
- [ ] Set up real database (MongoDB/PostgreSQL)
- [ ] Configure real payment gateway
- [ ] Test with real emails
- [ ] Set up HTTPS/SSL
- [ ] Deploy to production server

### Optional Enhancements
- [ ] Add database for data persistence
- [ ] Add payment processing
- [ ] Customize email templates
- [ ] Add more admin users
- [ ] Create custom branding
- [ ] Add analytics
- [ ] Set up monitoring

---

## 📋 Quick Reference

**If something fails, check:**

| Issue | Check | Fix |
|-------|-------|-----|
| Backend won't start | Port 5000 in use | Kill process or change PORT |
| Emails not sending | Gmail credentials | Check app password, enable less secure |
| Frontend error | API URL wrong | Verify VITE_API_URL in .env.local |
| Admin login fails | Credentials wrong | Use admin/admin123 |
| Project not created | Backend error | Check backend console |

---

## 🎉 You're Done!

Congratulations! Your Donor Project Tracker system is:

✅ Installed  
✅ Configured  
✅ Running  
✅ Tested  
✅ Working  

You're ready to start accepting donations and tracking projects!

---

**Next:** Read [FINAL_SUMMARY.md](../FINAL_SUMMARY.md) for next steps and deployment guide.

**Questions?** Check [DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md) for all available guides.

Happy tracking! 🚀
