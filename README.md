## 🌐 Live App

- **Frontend (Vercel):** https://kisan-bot-six.vercel.app
- **Backend (Render):** https://kisanbot-mzwe.onrender.com

## 🛠️ Tech Stack
- Frontend: React JS + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB Atlas + Mongoose
- AI: Google Gemini API
- Auth: JWT + bcrypt
- Deployment: Vercel (frontend) + Render (backend)

## ⚠️ Known Limitations (Free Tier)
- Render free tier spins down after 15 minutes of inactivity
- First request after idle takes 30–60 seconds to wake up
- MongoDB Atlas free tier has 512MB storage limit

# KisanBot 🌾

AI-powered crop advisory web app built for farmers in the Kedarnath Valley, Uttarakhand. Farmers submit a crop and problem, and KisanBot returns practical, AI-generated advice they can act on immediately.

## Features

- **Authentication** — JWT-based register/login, protected routes, session persistence
- **Per-user Crop Queries** — full CRUD (create, read, update, delete), scoped so each farmer only sees their own queries
- **AI Advice Generation** — powered by Google Gemini; farmers enter a crop and problem and get instant, farmer-friendly advice
- **Responsive UI** — works cleanly at mobile (375px), tablet (768px), and desktop (1440px), including a collapsible mobile navigation menu
- **Robust UX** — form validation, delete confirmations, empty states, loading indicators, and a React error boundary so the app never shows a blank crash screen
- **Dark mode** toggle across the whole app

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI:** Google Gemini API
- **Auth:** JWT, bcrypt

## Getting Started

### Backend
```bash
cd backend
npm install
# create a .env file — see .env.example for required variables
npm run dev
```

### Frontend
```bash
npm install
npm start
```

## Environment Variables

See `backend/.env.example` for the required variables (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`). Never commit your actual `.env` file.

---
Built with ❤️ for Kedarnath Valley farmers | TBI-GEU SIP 2026