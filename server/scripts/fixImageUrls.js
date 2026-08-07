// One-off migration: strips a baked-in "http(s)://<host>" prefix off any
// Artwork/Workshop `image` field that points at "/uploads/...", converting it
// to a relative path. Needed because upload.controller.js used to store the
// absolute URL of whichever host handled the upload (e.g. localhost:5050),
// which breaks once the app is viewed against a different backend (e.g. the
// Render deployment). Run this once from server/ where MONGO_URI is
// available, after pulling the upload.controller.js fix:
//
//   cd server
//   node scripts/fixImageUrls.js
//
// Safe to re-run: only touches values that still have an absolute
// "http://" or "https://" prefix in front of "/uploads/".

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Artwork from '../models/Artwork.js';
import Workshop from '../models/Workshop.js';

dotenv.config();

const UPLOADS_PREFIX_RE = /^https?:\/\/[^/]+(\/uploads\/.+)$/i;

async function fixCollection(Model, label) {
  const docs = await Model.find({ image: { $regex: '^https?://.*\\/uploads\\/' } });
  let updated = 0;

  for (const doc of docs) {
    const match = doc.image.match(UPLOADS_PREFIX_RE);
    if (!match) continue;
    const relative = match[1];
    console.log(`${label} ${doc._id}: ${doc.image} -> ${relative}`);
    doc.image = relative;
    await doc.save();
    updated += 1;
  }

  console.log(`${label}: ${updated} document(s) updated.`);
  return updated;
}

async function run() {
  await connectDB();

  const artworkCount = await fixCollection(Artwork, 'Artwork');
  const workshopCount = await fixCollection(Workshop, 'Workshop');

  console.log(`Done. ${artworkCount + workshopCount} total document(s) fixed.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
