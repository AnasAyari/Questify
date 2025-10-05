# Questify Quick Start Guide

## 🚀 Get Started in 3 Steps

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/AnasAyari/Questify.git
cd Questify

# Run the setup script
./setup.sh

# Start the backend (Terminal 1)
cd backend
source venv/bin/activate
python manage.py runserver

# Start the frontend (Terminal 2)
cd frontend
npm run dev
```

Open your browser to [http://localhost:5173](http://localhost:5173)

### Option 2: Docker (Easiest)

```bash
# Clone the repository
git clone https://github.com/AnasAyari/Questify.git
cd Questify

# Start everything with Docker
docker-compose up
```

Open your browser to [http://localhost:5173](http://localhost:5173)

### Option 3: Manual Setup

#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Optional
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎮 First Steps

1. **Open the app** at http://localhost:5173
2. **Explore the Dashboard** - View your stats and achievements
3. **Check Quest Board** - See available daily tasks
4. **Complete a Quest** - Click "Complete" to earn XP and coins
5. **Level Up** - Watch your character grow!
6. **Visit the Shop** - Spend coins on cosmetic items
7. **Write in Journal** - Log your progress and thoughts

## 📊 Admin Panel

If you created a superuser, access the admin panel at:
- URL: http://localhost:8000/admin
- Manage users, quests, items, and more

## 🎨 Customize

- **Add Quests**: Use the Django admin or API
- **Create Items**: Add new shop items via admin
- **Modify Theme**: Edit `frontend/src/index.css`
- **Change Colors**: Update Tailwind config

## 📚 Learn More

- [Full README](README.md) - Complete documentation
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [API Documentation](backend/core/urls.py) - Available endpoints

## ❓ Common Issues

**Port already in use?**
- Backend: Change port with `python manage.py runserver 8001`
- Frontend: Change in `vite.config.js`

**Database errors?**
- Run: `python manage.py migrate`

**Missing dependencies?**
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

## 🎉 You're Ready!

Start completing quests and level up your life! 🚀
