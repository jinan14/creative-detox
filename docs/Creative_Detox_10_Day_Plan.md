# Creative Detox — 10-Day Build Plan

*Based on the Revised Scope spec (simplified checkout, single-call AI recommendation, localhost-only) and the existing `jinan14/creative-detox` frontend repo.*

---

## 0. Repo & Folder Mapping

You are **not** starting a new repo. Extend the existing `creative-detox` repo with a backend folder, and grow the frontend `src/` in place.

```
creative-detox/
│
├── src/                          ← EXISTING (Vite/React frontend) — extend in place
│   ├── components/
│   │   ├── Navbar.jsx            ← EDIT: add Login/Register/Cart/Admin links
│   │   ├── Footer.jsx            ← keep as-is
│   │   ├── WorkshopCard.jsx      ← keep, feed real DB data instead of static file
│   │   ├── RegistrationForm.jsx  ← EDIT: wire onSubmit to real API call
│   │   ├── GalleryGrid.jsx       ← REPURPOSE: becomes basis for ArtworkGrid
│   │   ├── CTASection.jsx, FAQ.jsx, TestimonialCard.jsx  ← keep as-is
│   │   ├── ArtworkCard.jsx       ← NEW
│   │   ├── CartDrawer.jsx        ← NEW
│   │   ├── ProtectedRoute.jsx    ← NEW (role-based route guard)
│   │   └── admin/                ← NEW folder
│   │       ├── AdminSidebar.jsx
│   │       ├── ArtworkTable.jsx
│   │       ├── WorkshopTable.jsx
│   │       ├── RegistrationsTable.jsx
│   │       └── GypsumOrdersTable.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx, About.jsx, Contact.jsx   ← keep, light edits
│   │   ├── Gallery.jsx           ← EDIT: pulls artworks from API, adds cart buttons
│   │   ├── Workshops.jsx         ← EDIT: pulls workshops from API
│   │   ├── Login.jsx             ← NEW
│   │   ├── Register.jsx          ← NEW
│   │   ├── Cart.jsx              ← NEW
│   │   ├── Gypsum.jsx            ← NEW
│   │   ├── Recommend.jsx         ← NEW (AI emotion-based recommender)
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminArtworks.jsx
│   │       ├── AdminWorkshops.jsx
│   │       ├── AdminRegistrations.jsx
│   │       └── AdminGypsum.jsx
│   │
│   ├── context/                  ← NEW
│   │   ├── AuthContext.jsx       (JWT + user role, persisted to localStorage)
│   │   └── CartContext.jsx       (cart state fetched/synced from `/api/cart`, no localStorage)
│   │
│   ├── data/                     ← DELETE once live API replaces static workshops.js
│   ├── api/                      ← NEW
│   │   └── axios.js              (Axios instance, baseURL http://localhost:5000/api)
│   │
│   └── App.jsx                   ← EDIT: add all new routes + AuthProvider/CartProvider
│
├── server/                       ← NEW — entire backend lives here
│   ├── server.js                 (Express app entry)
│   ├── config/db.js              (Mongoose connection)
│   ├── models/
│   │   ├── User.js
│   │   ├── Artwork.js
│   │   ├── Workshop.js
│   │   ├── Registration.js
│   │   ├── GypsumOrder.js
│   │   ├── Cart.js
│   │   ├── Order.js              (optional)
│   │   └── AdminLog.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── artwork.routes.js
│   │   ├── workshop.routes.js
│   │   ├── registration.routes.js
│   │   ├── gypsum.routes.js
│   │   ├── cart.routes.js
│   │   ├── upload.routes.js      (admin image upload, added Day 7)
│   │   └── ai.routes.js
│   ├── controllers/              (one per route file above)
│   ├── middleware/
│   │   ├── auth.middleware.js    (verify JWT)
│   │   ├── admin.middleware.js   (role check)
│   │   └── upload.middleware.js  (multer config, added Day 7)
│   ├── uploads/                  (admin-uploaded artwork/workshop images, added Day 7 — committed to git so both dev machines share the same files, served statically at /uploads)
│   └── .env                      (MONGO_URI, JWT_SECRET, OPENAI_API_KEY, PORT)
│
├── package.json                  ← EXISTING (frontend)
└── README.md                     ← EXISTING, update at the end
```

**Design system carried over as-is:** Tailwind color tokens (teal / berry / cream), fonts, Framer Motion transition patterns from `Home.jsx`/`Gallery.jsx`. Every new page/component should visually match these, not introduce a new palette.

---

## 1. Database Schema (Mongoose)

| Collection | Key Fields |
|---|---|
| **Users** | `name, email (unique), passwordHash (bcrypt), role (user/admin, default user), createdAt` |
| **Artworks** | `title, description, image, artist, price, category, available (bool, default true), createdAt` |
| **Workshops** | `title, description, date, time, location, capacity, seatsRemaining, price (default 0)` |
| **Registrations** | `user (ref), workshop (ref), registeredAt (default now)` — compound unique index on `(user, workshop)` to enforce "already registered" check |
| **GypsumOrders** | `user (ref), arabicText, notes, size, color, status (pending/in_production/completed, default pending), createdAt` |
| **Cart** | `user (ref, unique — one cart per user), items (array of Artwork refs), updatedAt` |
| **Orders** *(optional)* | `user (ref), items (array of Artwork refs), total, placedAt (default now)` — only if checkout needs a logged record for the demo |
| **AdminLog** | `admin (ref → Users), action (create/update/delete/status_change), entityType (Artwork/Workshop/GypsumOrder/Registration), entityId, description, timestamp (default now)` |

Cart moves to the database — no localStorage. Each user has exactly one `Cart` document; `CartContext` fetches/mutates it via the API instead of holding item state locally.

---

## 2. REST API Map

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | — | create user |
| POST | `/api/auth/login` | — | returns JWT |
| GET | `/api/artworks` | — | list artworks |
| POST/PUT/DELETE | `/api/artworks/:id` | admin | manage artworks |
| GET | `/api/workshops` | — | list workshops |
| POST/PUT/DELETE | `/api/workshops/:id` | admin | manage workshops |
| POST | `/api/registrations` | user | register for workshop, decrement seat |
| GET | `/api/registrations` | admin | list all, filterable by workshop |
| POST | `/api/gypsum` | user | submit custom order |
| GET | `/api/gypsum` | admin | list/manage orders |
| PUT | `/api/gypsum/:id` | admin | update status |
| GET | `/api/cart` | user | fetch (or lazily create) the current user's cart |
| POST | `/api/cart/items` | user | add an artwork to the cart |
| DELETE | `/api/cart/items/:artworkId` | user | remove an artwork from the cart |
| DELETE | `/api/cart` | user | clear cart (post-checkout) |
| GET | `/api/admin/logs` | admin | list admin action history |
| POST | `/api/upload` | admin | upload an image file (multipart/form-data), returns its served URL — used by the artwork/workshop admin forms in place of pasting a URL |
| POST | `/api/ai/recommend` | user | emotion/text → matching workshop names |

---

## 3. Day-by-Day Plan

### **Day 1 — Project Setup & Backend Skeleton**
- Create `server/` folder inside existing repo; `npm init`, install `express mongoose bcrypt jsonwebtoken cors dotenv openai`
- Set up `server.js`, `config/db.js`, connect to a MongoDB Atlas cluster via `MONGO_URI` (mongodb+srv connection string), confirm health-check route works
- Define all Mongoose models (schema table above: User, Artwork, Workshop, Registration, GypsumOrder, Cart, AdminLog, Order optional)
- Set up `.env` (Mongo URI, JWT secret, OpenAI key placeholder) and add `server/.env` to `.gitignore`
- Frontend: add `src/api/axios.js`, create `.env` for `VITE_API_URL`
- **Deliverable:** backend running on `localhost:5000`, frontend still running on `localhost:5173`, one test GET route confirmed working end-to-end via Axios.

### **Day 2 — Authentication**
- Backend: `auth.routes.js` + controller — register (bcrypt hash), login (JWT sign), `auth.middleware.js` to verify token, `admin.middleware.js` for role check
- Frontend: `AuthContext.jsx` (login/register/logout, persist JWT + role to localStorage), `Login.jsx`, `Register.jsx` pages styled to match existing palette
- Edit `Navbar.jsx`: show Login/Register when logged out, show user name + Logout + (Admin link if role=admin) when logged in
- `ProtectedRoute.jsx` component wrapping user-only and admin-only routes
- **Deliverable:** can register, log in, log out; protected routes correctly redirect unauthenticated users.

### **Day 3 — Artwork Gallery (real data)**
- Backend: `artwork.routes.js` full CRUD, seed ~10 sample artworks into the Atlas cluster (via a seed script or Compass/Atlas Data Explorer connected to the Atlas URI)
- Frontend: repurpose `GalleryGrid.jsx` → `ArtworkCard.jsx` + updated `Gallery.jsx` fetching from `/api/artworks`, showing price/availability/Add to Cart button
- **Deliverable:** Gallery page shows real DB-backed artworks in the existing visual style.

### **Day 4 — Cart & Simplified Checkout (DB-backed)**
- Backend: `Cart` model + `cart.routes.js` — `GET /api/cart` (fetch or lazily create the user's cart), `POST /api/cart/items` (add artwork), `DELETE /api/cart/items/:artworkId` (remove), `DELETE /api/cart` (clear on checkout)
- Frontend: `CartContext.jsx` fetches the cart from the API on login/mount and calls the above endpoints for every mutation — no localStorage persistence; `CartDrawer.jsx` or `Cart.jsx` page reads from context, wire "Add to Cart" buttons from Day 3
- "Checkout" button → `DELETE /api/cart` → toast/modal "Order Placed" (optional: fire a single `POST /api/orders` first to log a record, skip if short on time)
- **Deliverable:** full add → view cart → checkout → confirmation → cart cleared flow works end-to-end, cart persists across logins/devices since it's read from MongoDB.

### **Day 5 — Workshops (real data + real registration)**
- Backend: `workshop.routes.js` CRUD, seed ~6 sample workshops; `registration.routes.js` — POST decrements `seatsRemaining` and blocks over-capacity
- Frontend: `Workshops.jsx` fetches from `/api/workshops`; rewire existing `RegistrationForm.jsx` to actually `POST /api/registrations` instead of faking success locally (keep the same success animation UI)
- **Deliverable:** workshop list is DB-driven, registration is real and persisted, seat counts update.

### **Day 6 — Gypsum Custom Order Feature**
- Backend: `gypsum.routes.js` — create (user), list/update status (admin)
- Frontend: new `Gypsum.jsx` page/form (Arabic text, notes, size, color) styled consistently with `RegistrationForm.jsx` patterns; add nav link
- **Deliverable:** logged-in user can submit a gypsum order and see a confirmation; order is saved to DB.

### **Day 7 — Admin Dashboard, Part 1 (Artworks + Workshops)**
- Backend: add `AdminLog` model + a small logging helper called from each admin create/update/delete/status-change controller (records `admin`, `action`, `entityType`, `entityId`, `description`)
- Backend: install `multer`; add `middleware/upload.middleware.js` (disk storage → `server/uploads/`, image-mimetype filter, size limit, use `path.join`/`path.extname` — not manual string concatenation — so it works identically on the Mac Mini and the Windows Lenovo) and `routes/upload.routes.js` — `POST /api/upload` (auth + admin, single `image` field) returns `{ url: "http://localhost:5050/uploads/<filename>" }`; serve the folder statically via `app.use('/uploads', express.static('uploads'))` in `server.js`. **Do not gitignore `server/uploads/`** — commit uploaded images to git like any other file. The Atlas-hosted DB already syncs between the Mac Mini and the Lenovo automatically, but uploaded image files only exist on whichever machine's disk received them; if the folder were gitignored, artwork documents would reference image URLs that 404 on the other machine. `git push` after an upload session, `git pull` on the other machine before presenting, same discipline as any other code change.
- Frontend: `AdminDashboard.jsx` shell + `AdminSidebar.jsx`, `AdminArtworks.jsx` (add/edit/delete/mark sold), `AdminWorkshops.jsx` (create/edit/delete/change seats/dates) — both forms use a file input for the image field: upload to `/api/upload` first, then submit the returned URL as the artwork/workshop's `image` value, instead of pasting a URL by hand
- Wrap all `/admin/*` routes in `ProtectedRoute` requiring `role === 'admin'`
- **Deliverable:** admin can fully manage artworks and workshops through the UI — including uploading image files directly from the admin form — changes reflect immediately on public pages, and each mutation writes an `AdminLog` entry.

### **Day 8 — Admin Dashboard, Part 2 (Registrations + Gypsum Orders)**
- Frontend: `AdminRegistrations.jsx` (view all, filter by workshop), `AdminGypsum.jsx` (view notes, update status, mark completed)
- Backend: filtering query param support on `GET /api/registrations?workshop=id`; wire `AdminLog` writes into gypsum status-change and registration actions too; add `GET /api/admin/logs` and an optional `AdminActivityLog.jsx` panel to browse recent actions
- **Deliverable:** admin dashboard is feature-complete per spec, with an auditable log of admin actions.

### **Day 9 — AI Emotion-Based Recommendation**
- Backend: `ai.routes.js` — receives emotion/free text, pulls current workshop titles+descriptions from MongoDB, sends one prompt to OpenAI API asking it to return only matching workshop names, returns array to frontend
- Frontend: `Recommend.jsx` — "How are you feeling today?" UI (predefined emotion buttons + free-text fallback), displays returned workshop names as cards (reuse `WorkshopCard.jsx` styling)
- **Deliverable:** end-to-end AI feature working locally with a real OpenAI call.

### **Day 10 — Integration Testing, Polish & Presentation Prep**
- Full click-through test of every flow: register/login, gallery→cart→checkout, workshop browse→register, gypsum order, AI recommend, all admin CRUD screens
- Fix bugs, tighten loading/error states, confirm role-based route protection can't be bypassed
- Responsive check (the existing repo is already mobile-first — verify new pages match)
- Update `README.md` with setup instructions for both frontend and `server/`
- Prepare a short demo script/walkthrough order for presentation day
- **Deliverable:** stable, demo-ready local build.

---

## 4. Risk Notes / Where to Cut Further if Behind Schedule

- **First to cut:** Gypsum admin status workflow — reduce to a simple list view if Day 8 runs long.
- **Second to cut:** AI predefined-emotion buttons — free-text-only input is still a complete, demoable feature.
- **Never cut:** Auth + role-based admin protection — this is core to "demonstrating authentication and authorization" in your objectives, and both course rubrics will likely check for it directly.
