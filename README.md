# LinkedIn-Clone (Simple Social Media Web App)

## Author
Saikumar Kadiri (GitHub: kadirisaikumar3)

## Overview
Simple LinkedIn-like web app where users can sign up, log in, create posts, and view public feed.

## Folder structure
- backend/  -> Node/Express API
- frontend/ -> React app

## Local setup
1. Clone or unzip the project.
2. Backend:
   - cd backend
   - npm install
   - create .env (from .env.example) and set MONGO_URI and JWT_SECRET
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - set REACT_APP_API_URL in .env (e.g. http://localhost:5000/api)
   - npm start

## Deploy
- Deploy backend to Render/Railway/Heroku (set env vars).
- Deploy frontend to Vercel/Netlify and set REACT_APP_API_URL to your backend URL.

## Email submission
Send links to hr@appdost.in with subject "LinkedIn Clone – Internship Assignment Submission | Saikumar"

