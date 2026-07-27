# Creative Detox — Project Context for Claude Code

Senior project: full-stack platform combining an art marketplace, workshop registration,
custom gypsum orders, and a single-call AI recommendation feature. Runs entirely on
localhost — no deployment, no hosting, no CI/CD in scope.

**Read these before starting work on any task:**
- `docs/Creative_Detox_Spec_Revised.md` — full feature spec (roles, features, DB collections, API surface)
- `docs/Creative_Detox_10_Day_Plan.md` — day-by-day build plan with exact deliverables and file-level tasks

## Repo layout

Single repo. Frontend already exists in `src/`; backend lives in `server/` (create on Day 1
per the plan — do not create a separate repo for it).

```
creative-detox/
├── src/       ← existing Vite/React frontend, extend in place
├── server/    ← Express + MongoDB backend, added per the 10-day plan
├── docs/      ← spec + build plan (read these first)
└── package.json  ← frontend
```

## Stack

- Frontend: React 19, React Router 7, Tailwind CSS 4, Framer Motion, react-icons, Vite 8
- Backend (to build): Node.js, Express, Mongoose, MongoDB Atlas (cloud-hosted, free M0 cluster — shared between the Mac Mini and the presentation laptop, not a local instance)
- Auth: JWT + bcrypt
- File uploads: Multer (admin artwork/workshop images, added Day 7 — see Conventions below)
- AI: single OpenAI API call for emotion → workshop matching (not a full recommendation engine)

## Conventions to follow

- Match the existing Tailwind color tokens (teal / berry / cream) and Framer Motion
  transition patterns already used in `Home.jsx` / `Gallery.jsx`. Don't introduce a new
  visual style for new pages/components.
- Frontend calls the backend through `src/api/axios.js` (baseURL from `VITE_API_URL`,
  default `http://localhost:5050/api` — port 5000 conflicts with macOS Control Center's
  AirPlay Receiver, so the backend runs on 5050 instead).
- Cart is DB-backed per the 10-Day Plan (`server/models/Cart.js`, `cart.routes.js`) — one
  `Cart` document per user, no localStorage. `CartContext` fetches/mutates it via the API.
- `server/.env` holds `MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, `PORT` — never commit it
  (already in `.gitignore`). `MONGO_URI` is an Atlas `mongodb+srv://` connection string, not
  `mongodb://localhost`. It must be set identically in `server/.env` on every machine that
  runs the backend (Mac Mini and the presentation laptop) since the .env file itself never
  travels with git. There's a second, lower-stakes `.env` at the repo root for the frontend
  (`VITE_API_URL=http://localhost:5050/api`) — also gitignored, but harmless to skip copying
  since `src/api/axios.js` falls back to that same default value when the file is absent.
- Atlas Network Access is set to allow access from anywhere (0.0.0.0/0) so the backend can
  connect from any wifi network (home, uni) without updating an IP allowlist each time. Note
  that both machines hit the same live Atlas cluster — data (including anything the admin
  adds/edits) is shared and visible immediately on both, there's no separate "Mac Mini's data"
  vs "Lenovo's data."
- Artwork/workshop images are uploaded, not pasted as URLs. Admin forms (`AdminArtworks.jsx`,
  `AdminWorkshops.jsx`, from Day 7) use a file input that posts to `POST /api/upload`
  (multer, admin-only), which saves the file to `server/uploads/` and returns the URL to
  store in the `image` field. **`server/uploads/` is committed to git, not gitignored** —
  unlike `.env`, these files have no secrets in them, and the Mac Mini/Lenovo split means an
  uploaded image only physically exists on whichever machine's disk received it. MongoDB
  itself syncs fine (it's cloud-hosted), but if the uploads folder were excluded from git, an
  artwork's `image` URL would resolve to a 404 on whichever machine didn't do the upload.
  `git push` after an upload session on the Mac Mini, `git pull` on the Lenovo before
  presenting. Don't fall back to seeding image URLs by hand (Unsplash links, `public/` folder
  paths) for real content — that was a stopgap used before upload existed; once Day 7 lands,
  add/replace artwork images through the admin UI.
- Two machines, one repo: after `git clone`/`git pull` on a machine that hasn't run this
  project before, both `npm install` (repo root, for the frontend) and `npm install` inside
  `server/` are needed — `node_modules` is gitignored on both sides and doesn't travel with
  git. Keep Node.js on a similar major version across the Mac Mini and the Lenovo to avoid
  subtle dependency-resolution differences.

## Where we are

Work through `docs/Creative_Detox_10_Day_Plan.md` in order (Day 1 → Day 10). When asked to
"do Day N," open that day's section in the plan and implement exactly what it lists —
check off the stated deliverable before moving on.
