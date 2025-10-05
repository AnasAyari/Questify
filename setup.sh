#!/bin/bash

# Questify Setup Script
# This script sets up both the frontend and backend for development

echo "🎮 Setting up Questify..."
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the Questify root directory"
    exit 1
fi

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "To create a superuser, run:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py createsuperuser"
echo ""

cd ..

# Setup Frontend
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
npm install

echo ""
echo "✅ Frontend setup complete!"
echo ""

cd ..

echo "🎉 Questify setup complete!"
echo ""
echo "To start development:"
echo "  1. Backend:  cd backend && source venv/bin/activate && python manage.py runserver"
echo "  2. Frontend: cd frontend && npm run dev"
echo ""
echo "The frontend will be available at http://localhost:5173"
echo "The backend will be available at http://localhost:8000"
echo "The admin panel will be at http://localhost:8000/admin"
echo ""
