@echo off
REM Quick Start Script for Ayoub Welfare Donor Tracker
echo.
echo ========================================
echo Ayoub Welfare - Donor Project Tracker
echo ========================================
echo.
echo This script will help you set up and run the system
echo.

REM Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Setup Backend
echo ========== BACKEND SETUP ==========
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend dependencies already installed
)

echo.
echo ⚠️  IMPORTANT: Configure backend environment
echo.
if not exist "backend\.env" (
    echo Copying .env template...
    copy backend\.env.example backend\.env
    echo.
    echo 📝 Please edit: backend\.env
    echo    - Set JWT_SECRET to a random string
    echo    - Set EMAIL_USER and EMAIL_PASSWORD for Gmail
    echo    - Get Gmail app password: https://myaccount.google.com/apppasswords
    echo.
    echo After configuring, run this script again.
    pause
    exit /b 0
)

echo ✅ Backend .env configured
echo.

REM Setup Frontend
echo ========== FRONTEND SETUP ==========
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)

echo.
echo ========================================
echo Setup Complete! Ready to start...
echo ========================================
echo.
echo Run the following commands in separate terminals:
echo.
echo Terminal 1 (Backend):
echo   cd backend ^& npm run dev
echo.
echo Terminal 2 (Frontend):
echo   npm run dev
echo.
echo Then open:
echo   - Frontend: http://localhost:5173
echo   - Backend API: http://localhost:5000/api
echo.
echo Test credentials:
echo   - Admin username: admin
echo   - Admin password: admin123
echo.
pause
