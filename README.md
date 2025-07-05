# Songify – Full-Stack Music Manager

A MERN-style application for managing songs, playlists, user accounts, and favorites.  
Built with React, Redux Toolkit, Redux-Saga, Emotion (frontend) and Node.js, Express, MongoDB, Mongoose, Passport.js (backend).

---

## Features

• User Authentication (JWT in HttpOnly cookies)  
• CRUD Songs (Title, Artist, Album, Genre)  
• CRUD Playlists (with song membership)  
• User-specific Favorites (persisted in localStorage)  
• Search & Filters (Title, Artist, Genre, Album)  
• Pagination on Songs list  
• Dashboard Statistics (totals, top genres/artists/albums)  
• Role-based access control  
• Responsive UI with loading & error states

---

## Tech Stack

**Frontend**  
• React 18 + TypeScript  
• Redux Toolkit + Redux-Saga  
• React Router v6  
• Emotion for CSS-in-JS  
• Vite, React Hot Toast

**Backend**  
• Node.js + Express  
• MongoDB + Mongoose  
• Passport.js (Local & JWT strategies)  
• Joi for validation  
• Winston logging  
• Dockerized, configurable via `config/*` (environments, CORS, logging)

---

## Getting Started

### Prerequisites

• Node.js ≥16, pnpm or npm  
• MongoDB (local or Atlas)  
• Docker & Docker Compose (optional)

### Environment Variables

Create `.env` files in `backend/` and `frontend/` from their respective `.env.example`:

**backend/.env**

```
PORT=5000
MONGO_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**

```
VITE_API_URL=http://localhost:5000/api
```

### Install & Run Locally

#### Backend

```bash
cd backend
pnpm install            # or npm install
pnpm run dev            # start in development mode
```

#### Frontend

```bash
cd frontend
pnpm install            # or npm install
pnpm run dev            # starts Vite at http://localhost:5173
```

### Docker Compose (All-in-One)

```bash
docker-compose up --build
```

• Backend: `http://localhost:5000`  
• Frontend: `http://localhost:5173`

---

## API Endpoints

Base URL: `{{VITE_API_URL}}`

**Auth**  
• POST `/auth/sign-up`  
• POST `/auth/log-in`  
• GET `/auth/me`  
• GET `/auth/log-out`

**Songs**  
• GET `/songs` (pagination & filters)  
• GET `/songs/:id`  
• POST `/songs`  
• PATCH `/songs/:id`  
• DELETE `/songs/:id`

**Playlists**  
• GET `/playlists/my`  
• GET `/playlists/public`  
• GET `/playlists/:id`  
• POST `/playlists`  
• PATCH `/playlists/:id`  
• DELETE `/playlists/:id`  
• POST `/playlists/:id/songs`  
• DELETE `/playlists/:id/songs/:songId`

**Statistics**  
• GET `/statistics` – totals & breakdowns

**Metadata**  
• GET `/songs/meta/genres`  
• GET `/songs/meta/albums`

---

## Folder Structure

```text
backend/
├─ src/
│  ├─ config/          # environments, CORS, passport, routes
│  ├─ controllers/     # request handlers
│  ├─ middlewares/     # auth, validations, error handling
│  ├─ models/          # Mongoose schemas, hooks, statics, methods
│  ├─ routes/          # Express routers
│  ├─ validators/      # Joi schemas
│  └─ index.ts         # server bootstrap

frontend/
├─ src/
│  ├─ api/             # axios clients & endpoints
│  ├─ features/
│  │  ├─ Auth/         # Login, SignUp, LogoutModal
│  │  ├─ Songs/        # SongsPage, SongItem, hooks
│  │  ├─ Playlists/    # PlaylistsPage, Detail, modals
│  │  ├─ Favorites/    # FavoritesPage
│  │  └─ Dashboard/    # DashboardPage
│  ├─ redux/           # slices, sagas, store
│  ├─ router/          # route definitions & types
│  ├─ styles/          # GlobalStyles & theme
│  ├─ ui/              # Common components (Button, Loader, Modal, Pagination)
│  └─ App.tsx, main.tsx
├─ vite.config.ts
└─ package.json
```

---

## Deployment

**Frontend:** Netlify / Vercel

- Set `VITE_API_URL` to your backend’s public URL

**Backend:** Render / Koyeb / Heroku

- Build from `backend/Dockerfile` or Node
- Set `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` env vars

---

## Common Scripts

```bash
# Backend
pnpm run dev           # start dev server
pnpm run build         # transpile TS (if needed)
pnpm run start         # run production build
pnpm run seed -- --import    # seed sample data

# Frontend
pnpm run dev           # start HMR dev server
pnpm run build         # build for production
pnpm run preview       # serve built files locally
```
