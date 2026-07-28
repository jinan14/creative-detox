# 🎨 Creative Detox — Art For Your Mental Escape

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

**A full-stack MERN platform combining an art marketplace, workshop registration,
custom gypsum orders, and an AI emotion-based workshop recommender.**

[Features](#-features) • [Tech Stack](#%EF%B8%8F-technologies-used) • [Getting Started](#-installation--setup) • [Demo Script](#-demo-walkthrough)

</div>

---

Creative Detox is a senior project built as a full-stack platform where users browse
and buy artwork, register for creative workshops, commission custom Arabic-calligraphy
gypsum carvings, and get AI-matched to a workshop based on how they're feeling. Admins
manage all of it — artworks, workshops, registrations, gypsum orders, and an audit log
of every admin action — through a dedicated dashboard.

**This project runs entirely on localhost.** There is no deployment, hosting, or CI/CD —
the database is a cloud-hosted MongoDB Atlas cluster (so data is shared and always in
sync), but both the frontend and backend are meant to be run locally by whoever is
presenting.

---

## Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
- [📁 Folder Structure](#-folder-structure)
- [🔌 API Overview](#-api-overview)
- [🎬 Demo Walkthrough](#-demo-walkthrough)
- [👤 Author](#-author)

---

## ✨ Features

- 🔐 **Authentication & roles** — JWT-based register/login, bcrypt-hashed passwords,
  route protection for both logged-in users and admin-only pages
- 🖼️ **Artwork marketplace** — browse a real, database-backed gallery, view artwork
  detail pages, add to a persistent (DB-backed, not localStorage) cart, and check out
- 🎨 **Workshops & registration** — browse workshops by category, register with live
  seat-count tracking (blocks over-capacity, prevents duplicate registration)
- ✍️ **Custom gypsum orders** — request a hand-carved gypsum piece with Arabic
  calligraphy, size, and color, tracked through a status pipeline (pending → in
  production → completed)
- 🤖 **AI workshop recommender** — describe how you're feeling (or pick an emotion),
  and a single OpenAI call matches you to the most relevant current workshops
- 🛠️ **Admin dashboard** — full CRUD for artworks and workshops (with real image
  uploads via Multer, not pasted URLs), registration/gypsum management, and an
  activity log auditing every admin action
- 📱 **Responsive design** — mobile-first Tailwind layout across every page, carried
  over from the original marketing site's teal/berry/cream visual system

---

## 🛠️ Technologies Used

| Category | Technologies |
|----------|---------------|
| **Frontend** | React 19, React Router 7, Tailwind CSS 4, Framer Motion, React Icons, Vite |
| **Backend** | Node.js, Express 5, Mongoose |
| **Database** | MongoDB Atlas (cloud-hosted, shared across dev machines) |
| **Auth** | JWT + bcrypt |
| **File Uploads** | Multer (admin artwork/workshop images) |
| **AI** | OpenAI API (single-call emotion → workshop matching) |

---

## 📋 Prerequisites

- **Node.js** v18+ and **npm** (keep the major version consistent across every machine
  that runs this project)
- **Git**
- A **MongoDB Atlas** connection string (`mongodb+srv://...`) — this project uses a
  shared cloud cluster, not a local MongoDB install
- An **OpenAI API key** for the AI recommendation feature

---

## 🚀 Installation & Setup

This is a single repo with two apps: the Vite/React frontend at the root, and an
Express backend in `server/`. Both need their own `npm install` and both need to be
running at the same time.

### 1. Clone the repository

```bash
git clone https://github.com/jinan14/creative-detox.git
cd creative-detox
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

**`server/.env`** (never committed — copy `server/.env.example` and fill in real values):

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/creative-detox?retryWrites=true&w=majority
JWT_SECRET=<any long random string>
OPENAI_API_KEY=<your OpenAI API key>
PORT=5050
```

> Port `5050`, not `5000` — port 5000 conflicts with macOS Control Center's AirPlay
> Receiver on Mac. Set this identically on every machine that runs the backend, since
> `.env` is gitignored and never travels with `git pull`.

**`.env`** at the repo root (optional — the frontend already falls back to this value
if the file is missing):

```env
VITE_API_URL=http://localhost:5050/api
```

### 5. Run both apps (two terminals)

```bash
# Terminal 1 — backend
cd server
npm run dev
```

```bash
# Terminal 2 — frontend
npm run dev
```

- Backend: `http://localhost:5050` (health check at `/api/health`)
- Frontend: `http://localhost:5173`

### 6. (Optional) Seed sample data

```bash
cd server
npm run seed:artworks
npm run seed:workshops
```

### Other useful scripts

```bash
npm run build      # production build of the frontend (dist/)
npm run preview    # preview the production build
npm run lint        # ESLint across both src/ and server/
```

---

## 📁 Folder Structure

```
creative-detox/
├── src/                     # React frontend (Vite)
│   ├── api/axios.js         # Axios instance, baseURL = VITE_API_URL
│   ├── components/          # Shared components + admin/ subfolder
│   ├── context/             # AuthContext (JWT/role), CartContext (DB-backed cart)
│   ├── pages/                # Route-level pages + admin/ dashboard pages
│   └── App.jsx               # Routes, providers
│
├── server/                   # Express + MongoDB backend
│   ├── config/db.js          # Mongoose/Atlas connection
│   ├── models/                # User, Artwork, Workshop, Registration,
│   │                          #   GypsumOrder, Cart, Order, AdminLog
│   ├── routes/ + controllers/ # One pair per resource (see API Overview)
│   ├── middleware/            # auth (JWT), admin (role check), upload (Multer)
│   ├── uploads/                # Admin-uploaded images — committed to git,
│   │                           #   served statically at /uploads
│   └── seed/                   # Sample data scripts
│
├── docs/                      # Spec + 10-day build plan
└── package.json                # Frontend
```

---

## 🔌 API Overview

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` \| `/login` | — | create account / get JWT |
| GET | `/api/artworks` \| `/:id` | — | browse artworks |
| POST/PUT/DELETE | `/api/artworks/:id` | admin | manage artworks |
| GET | `/api/workshops` | — | browse workshops |
| POST/PUT/DELETE | `/api/workshops/:id` | admin | manage workshops |
| POST | `/api/registrations` | user | register for a workshop |
| GET | `/api/registrations` | admin | list all, filterable by workshop |
| POST | `/api/gypsum` | user | submit a custom gypsum order |
| GET/PUT | `/api/gypsum` \| `/:id` | admin | manage orders / update status |
| GET/POST/DELETE | `/api/cart`, `/cart/items` | user | DB-backed cart |
| POST | `/api/orders` | user | place order from cart |
| GET | `/api/admin/logs` | admin | admin action history |
| POST | `/api/upload` | admin | upload an image (Multer) |
| POST | `/api/ai/recommend` | user | emotion/text → matching workshops |

---

## 🎬 Demo Walkthrough

A suggested presentation order lives in
[`docs/Creative_Detox_10_Day_Plan.md`](docs/Creative_Detox_10_Day_Plan.md) and the demo
script below — register/login → browse gallery → add to cart → checkout → browse
workshops → register for one → submit a gypsum order → try the AI recommender → switch
to an admin account and show artwork/workshop CRUD, registrations, gypsum status
updates, and the activity log.

---

## 👤 Author

**Jinan Ghannam**
- GitHub: [@jinan14](https://github.com/jinan14)

Developed for the **CSCI490 Information System Development ISD** senior project.

---

<div align="center">

**Made with ❤️ for creative minds and artistic souls**

[⬆ Back to top](#-creative-detox--art-for-your-mental-escape)

</div>
