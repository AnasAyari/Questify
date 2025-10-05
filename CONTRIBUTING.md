# Contributing to Questify

Thank you for your interest in contributing to Questify! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Questify.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes: `git commit -m "Add your descriptive commit message"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

### Quick Setup
Run the setup script:
```bash
./setup.sh
```

### Manual Setup

#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Using Docker
```bash
docker-compose up
```

## Code Style

### Frontend (JavaScript/React)
- Use functional components with hooks
- Use meaningful variable and function names
- Keep components focused and single-purpose
- Use TailwindCSS for styling
- Follow the existing animation patterns with Framer Motion

### Backend (Python/Django)
- Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Write docstrings for functions and classes
- Keep views focused and single-purpose
- Use Django REST Framework serializers properly

## Project Structure

```
Questify/
├── frontend/           # React frontend
│   └── src/
│       ├── components/ # React components
│       ├── App.jsx     # Main app
│       └── index.css   # Styles
├── backend/           # Django backend
│   ├── core/         # Main Django app
│   │   ├── models.py
│   │   ├── views.py
│   │   └── serializers.py
│   └── questify_api/ # Django project
└── README.md
```

## Feature Requests

If you have an idea for a new feature:
1. Check existing issues to see if it's already proposed
2. Create a new issue describing the feature
3. Wait for discussion and approval before implementing
4. Implement the feature in a new branch
5. Submit a Pull Request

## Bug Reports

When reporting bugs, please include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Python version, Node version)

## Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Update documentation if needed
- Add tests if applicable
- Ensure all tests pass
- Follow the existing code style
- Write clear commit messages
- Reference related issues in your PR description

## Questions?

Feel free to open an issue for any questions about contributing!
