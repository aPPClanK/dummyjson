# Fullstack Application — Django REST + React

This project is a simple fullstack web application that combines **Django REST Framework (backend)** and **React (frontend)**.  
The backend acts as a proxy API server, while the frontend consumes and displays the data using protected routes and authentication.

## Features

- Authentication with token-based login
- Products listing and pagination
- User profile page
- Protected routes in React (requires login)
- Django REST Framework as backend proxy for external APIs

## Tech Stack

### Backend (Django REST)
- Django 5+
- Django REST Framework
- `requests` library for proxy calls

### Frontend (React)
- React (with `react-router`)
- Fetch API for backend requests
- LocalStorage for access tokens

## Setup Instructions

### Clone the repository
```bash
git clone https://github.com/aPPClanK/dummyjson
cd dummyjson
```

### Backend setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

Default backend URL: http://localhost:8000
### Frontend setup (React)
```bash
cd frontend
npm install
npm run dev   # or npm start
```
Default frontend URL: http://localhost:5173 (if using Vite)

### Example Credentials (DummyJSON)
```
{
  "username": "emilys",
  "password": "emilyspass"
}
```
Use this account to log in and test API routes.