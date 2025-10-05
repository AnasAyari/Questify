# Questify

⚔️ **Questify** - A gamified productivity and discipline tracker with a fantasy RPG theme.

Turn your real-life tasks into epic quests! Complete daily challenges to earn XP and coins, level up your character, unlock achievements, and customize your avatar with cosmetic upgrades.

## Features

- **Quest Board** - Daily task list with XP and coin rewards
- **Character Card** - Avatar display with level, stats (Strength, Intelligence, Charisma, Discipline), and progress bars
- **Shop Page** - Spend coins on cosmetic upgrades (outfits, backgrounds, pets)
- **Dashboard** - XP bars, streaks, achievements, and coin totals
- **Journal** - Simple text log for personal reflections

## Tech Stack

### Frontend
- React with Vite
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons
- React Router for navigation
- Axios for API calls

### Backend
- Django REST Framework
- PostgreSQL database (SQLite for development)
- CORS headers for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python 3.12+
- PostgreSQL (optional for production, SQLite used in development)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (for admin access):
```bash
python manage.py createsuperuser
```

6. Create initial shop items (optional):
```bash
python manage.py shell
```
Then run:
```python
from core.models import Item

items = [
    {'name': 'Wizard Robe', 'item_type': 'outfit', 'price': 200, 'description': 'A mystical robe that channels arcane energy', 'emoji': '🧙‍♂️'},
    {'name': 'Knight Armor', 'item_type': 'outfit', 'price': 250, 'description': 'Shining armor for the brave warrior', 'emoji': '⚔️'},
    {'name': 'Dragon Pet', 'item_type': 'pet', 'price': 500, 'description': 'A loyal dragon companion', 'emoji': '🐉'},
    {'name': 'Phoenix Pet', 'item_type': 'pet', 'price': 600, 'description': 'A majestic phoenix that rises from ashes', 'emoji': '🔥'},
    {'name': 'Castle Background', 'item_type': 'background', 'price': 300, 'description': 'A grand castle backdrop', 'emoji': '🏰'},
    {'name': 'Forest Background', 'item_type': 'background', 'price': 250, 'description': 'A mystical forest setting', 'emoji': '🌲'},
]

for item_data in items:
    Item.objects.create(**item_data)

exit()
```

7. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`
- API endpoints: `http://localhost:8000/api/`
- Admin panel: `http://localhost:8000/admin/`

## API Endpoints

### Users
- `GET /api/users/` - List users
- `GET /api/users/me/` - Get current user profile

### Characters
- `GET /api/characters/` - List characters
- `POST /api/characters/{id}/gain_xp/` - Add XP to character

### Quests
- `GET /api/quests/` - List quests
- `POST /api/quests/` - Create quest
- `POST /api/quests/{id}/complete/` - Complete quest

### Items
- `GET /api/items/` - List shop items
- `POST /api/items/{id}/purchase/` - Purchase item

### Inventory
- `GET /api/inventory/` - List owned items
- `POST /api/inventory/{id}/equip/` - Equip item

### Journal
- `GET /api/journal/` - List journal entries
- `POST /api/journal/` - Create journal entry

## Database Configuration

### Development (SQLite)
The project uses SQLite by default for development. No additional setup required.

### Production (PostgreSQL)

Update `backend/questify_api/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'questify_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Project Structure

```
Questify/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── QuestBoard.jsx
│   │   │   ├── CharacterCard.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Journal.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json
│
├── backend/                 # Django backend
│   ├── core/               # Main Django app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   ├── urls.py         # API routes
│   │   └── admin.py        # Admin configuration
│   ├── questify_api/       # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## Theme & Design

Questify features a fantasy RPG theme with:
- Warm, parchment-like color palette
- Custom fantasy fonts (Cinzel for headers, Lora for body)
- Glowing XP bars with purple/blue gradients
- Smooth animations using Framer Motion
- Responsive design with TailwindCSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
