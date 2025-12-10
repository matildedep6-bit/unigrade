#!/bin/bash

# UniGrade Development Startup Script
# This script helps you quickly start the development environment

set -e

echo "🚀 UniGrade Development Environment Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found."
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✓ .env file created. Please update it with your Supabase credentials."
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install root dependencies
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install --workspace=frontend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --workspace=backend

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update .env file with your Supabase credentials"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo ""
echo "Alternatively, run in separate terminals:"
echo "  Terminal 1: npm run dev --workspace=backend"
echo "  Terminal 2: npm run dev --workspace=frontend"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:3001"
