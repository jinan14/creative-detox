// One-off migration: converts any .heic/.heif files already sitting in
// server/uploads/ to .jpg (most browsers can't render HEIC in <img> tags),
// updates every Artwork/Workshop document whose `image` field references the
// old filename, and removes the original .heic/.heif file. Run this once
// from server/ where MONGO_URI is available, after pulling the
// upload.controller.js HEIC-conversion fix:
//
//   cd server
//   node scripts/convertExistingHeic.js
//
// Safe to re-run: skips any file that no longer exists (already converted).

import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import convert from 'heic-convert';
import connectDB from '../config/db.js';
import Artwork from '../models/Artwork.js';
import Workshop from '../models/Workshop.js';

dotenv.config();

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const HEIC_EXT_RE = /\.hei[cf]$/i;

async function convertFile(heicFilename) {
  const heicPath = path.join(UPLOAD_DIR, heicFilename);
  const jpegFilename = heicFilename.replace(HEIC_EXT_RE, '.jpg');
  const jpegPath = path.join(UPLOAD_DIR, jpegFilename);

  const inputBuffer = await fs.readFile(heicPath);
  const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.9 });
  await fs.writeFile(jpegPath, outputBuffer);
  await fs.unlink(heicPath);

  return jpegFilename;
}

async function fixCollection(Model, label) {
  const docs = await Model.find({ image: { $regex: '\\.hei[cf]$', $options: 'i' } });
  let updated = 0;

  for (const doc of docs) {
    const oldFilename = doc.image.split('/').pop();

    let jpegFilename;
    try {
      jpegFilename = await convertFile(oldFilename);
    } catch (err) {
      console.error(`${label} ${doc._id}: failed to convert ${oldFilename} — ${err.message}`);
      continue;
    }

    const newImage = doc.image.replace(oldFilename, jpegFilename);
    console.log(`${label} ${doc._id}: ${doc.image} -> ${newImage}`);
    doc.image = newImage;
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
