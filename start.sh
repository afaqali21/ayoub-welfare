#!/bin/bash

# Quick Start Script for Ayoub Welfare Donor Tracker

echo ""
echo "========================================"
echo "Ayoub Welfare - Donor Project Tracker"
echo "========================================"
echo ""
echo "This script will help you set up and run the system"
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Setup Backend
echo "========== BACKEND SETUP =========="
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

echo ""
echo "⚠️  IMPORTANT: Configure backend environment"
echo ""
if [ ! -f "backend/.env" ]; then
    echo "Copying .env template..."
    cp backend/.env.example backend/.env
    echo ""
    echo "📝 Please edit: backend/.env"
    echo "   - Set JWT_SECRET to a random string"
    echo "   - Set EMAIL_USER and EMAIL_PASSWORD for Gmail"
    echo "   - Get Gmail app password: https://myaccount.google.com/apppasswords"
    echo ""
    echo "After configuring, run this script again."
    exit 0
fi

echo "✅ Backend .env configured"
echo ""

# Setup Frontend
echo "========== FRONTEND SETUP =========="
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""
echo "========================================"
echo "Setup Complete! Ready to start..."
echo "========================================"
echo ""
echo "Run the following commands in separate terminals:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  npm run dev"
echo ""
echo "Then open:"
echo "  - Frontend: http://localhost:5173"
echo "  - Backend API: http://localhost:5000/api"
echo ""
echo "Test credentials:"
echo "  - Admin username: admin"
echo "  - Admin password: admin123"
echo ""
