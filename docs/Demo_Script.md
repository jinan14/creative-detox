# Creative Detox — Presentation Demo Script

A walkthrough you can follow live in front of your instructor. Roughly 10–12 minutes if
you talk while clicking. Each step says what to click and what to say.

---

## Before you walk in

- [ ] Both servers running: `npm run dev` in `server/`, `npm run dev` at the repo root.
      Confirm `http://localhost:5050/api/health` returns `{"status":"ok"}` and
      `http://localhost:5173` loads.
- [ ] Confirm the venue has working wifi. A chunk of the seeded artwork/workshop images
      are still Unsplash placeholder URLs (not yet re-uploaded through the admin
      panel) — if the connection drops, those images won't load even though everything
      else keeps working. If you have a moment beforehand, re-upload real images for
      the ones you'll show through Admin → Artworks / Workshops so the demo doesn't
      depend on internet access at all.
- [ ] Have two accounts ready: one regular user, one admin. If you don't have a regular
      account handy, plan to register a fresh one live — it's a good demo beat anyway.
- [ ] Pick one artwork and one workshop ahead of time that you know have a real
      (non-placeholder) image, so the visuals look polished no matter what.
- [ ] Clear your cart / have a known-empty cart so the checkout flow demos cleanly.

---

## 1. Public site + registration (~2 min)

1. Land on **Home** — point out the design system (teal/berry/cream), Framer Motion
   entrance animations, and that this is a fully responsive layout (resize the window
   or open dev tools' device toolbar briefly to show it reflow).
2. Navigate to **Register**, create a new account live.
   - *Talking point:* password is bcrypt-hashed server-side, never stored in plaintext;
     a JWT is issued and stored client-side to keep the session.
3. You're auto-logged in and redirected. Point out the navbar now shows your name and
   a cart icon instead of Login/Register.

## 2. Gallery → Cart → Checkout (~2.5 min)

1. Go to **Gallery** — artworks are pulled live from MongoDB Atlas, not hardcoded.
2. Click into an artwork's detail page, then **Add to Cart**.
   - *Talking point:* the cart is stored in MongoDB per-user (`Cart` collection), not
     `localStorage` — it would follow you if you logged in from a different device.
3. Open the **Cart** page, show the item and total, click **Checkout**.
   - *Talking point:* checkout creates an `Order` record server-side, then clears the
     cart via a real API call.

## 3. Workshops → Registration (~2 min)

1. Go to **Workshops**, use the category filter.
2. Scroll to the registration form, pick a workshop, submit.
   - *Talking point:* registration is atomic on the backend — it decrements
     `seatsRemaining` only if a seat is available, and rolls back if the registration
     write fails, so two people can't both grab the last seat.
3. If you want to show the block: register for the same workshop twice — the second
   attempt returns "You are already registered for this workshop" (there's a unique
   index on `(user, workshop)` enforcing it, not just a UI check).

## 4. Gypsum custom order (~1 min)

1. Go to **Gypsum**, fill out the Arabic text / size / color form, submit.
   - *Talking point:* this is a fully custom feature beyond the original site scope —
     orders go into a status pipeline (pending → in production → completed) that
     admins manage.

## 5. AI recommendation (~1.5 min)

1. Go to **Recommend**, click an emotion (or type free text like "I've had a really
   overwhelming week").
2. Submit and show the matched workshop cards coming back.
   - *Talking point:* this is a single OpenAI call — the backend pulls current
     workshop titles/descriptions from the DB, sends one prompt asking the model to
     pick matching titles, and returns those. It's not a trained recommendation
     engine; it's a deliberately simple, real integration of an LLM into the product.

## 6. Admin dashboard (~3 min)

Log out, log back in with the admin account (or just say "now switching to an admin
account" and log in directly).

1. **Overview** — live counts of artworks/workshops/registrations/gypsum orders.
2. **Artworks** — Add Artwork, use the file picker to upload a real image (not a pasted
   URL), fill the rest of the form, save. Point out it appears instantly in the public
   Gallery.
   - *Talking point:* images go through Multer to `server/uploads/`, which is served
     statically and — unlike `.env` — is committed to git, so both dev machines share
     the same image files even though MongoDB is the only thing that's truly "live."
3. **Workshops** — same CRUD, plus editing seat counts directly.
4. **Registrations** — filter by workshop, show the admin-only registration list.
5. **Gypsum Orders** — change an order's status live (pending → in production), point
   out the UI updates optimistically then confirms with the server.
6. **Activity Log** — show that every one of the actions you just took (create/update/
   status change) was written to an audit trail with who did it and when.
   - *Talking point:* this directly satisfies the "demonstrate authorization" rubric
     item — every admin mutation is both role-gated (JWT + role check middleware) and
     logged.

## 7. Wrap-up talking points (if asked)

- **Why MongoDB Atlas instead of a local DB?** Two machines (a Mac Mini and a
  presentation laptop) need to see the same data without manually syncing a database
  file — Atlas is free-tier, cloud-hosted, and both machines connect to the same
  cluster over `mongodb+srv://`.
- **Why is the cart DB-backed instead of localStorage?** So it persists across logins
  and devices, and so "add to cart" is a real, testable API interaction rather than
  client-only state.
- **Why one OpenAI call instead of a full recommender system?** Scope — the assignment
  calls for demonstrating a real AI integration, not building a trained ML model. A
  single, well-designed prompt over live DB data is honest about what it is.
- **What stops a non-admin from hitting the admin API directly (e.g. with Postman)?**
  Every admin route is wrapped in both `auth` (verifies the JWT) and `admin`
  (checks `role === 'admin'` from the token payload) middleware — not just a hidden
  frontend route.

---

## If something breaks live

- **Images not loading:** likely the wifi-dependent Unsplash placeholders (see
  checklist above) — keep talking, point out it's a data/content issue, not a broken
  feature, and move to the next section.
- **"Failed to connect to MongoDB" on backend startup:** check `server/.env` has the
  right `MONGO_URI` for *this* machine, and that Atlas Network Access still allows
  0.0.0.0/0.
- **AI recommend returns an error:** check `OPENAI_API_KEY` in `server/.env` and that
  the venue's network allows outbound HTTPS to the OpenAI API.
