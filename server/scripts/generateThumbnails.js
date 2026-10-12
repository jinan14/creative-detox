// One-off migration: creates card-sized WebP thumbnails in uploads/thumbs/
// for every image already sitting in server/uploads/ (new uploads get one
// automatically in upload.controller.js). Purely file-based — no DB access.
// Run from server/, then commit the new uploads/thumbs/ files:
//
//   cd server
//   node scripts/generateThumbnails.js
//
// Safe to re-run: skips any image that already has a thumbnail.

import fs from 'fs/promises';
import path from 'path';
import {
  createThumbnail,
  thumbnailFilename,
  THUMB_DIR_NAME,
  THUMBNAILABLE_EXT_RE,
} from '../utils/thumbnail.js';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  const files = (await fs.readdir(UPLOAD_DIR)).filter((f) => THUMBNAILABLE_EXT_RE.test(f));
  let created = 0;
  let skipped = 0;

  for (const filename of files) {
    const thumbPath = path.join(UPLOAD_DIR, THUMB_DIR_NAME, thumbnailFilename(filename));
    if (await exists(thumbPath)) {
      skipped += 1;
      continue;
    }

    try {
      await createThumbnail(path.join(UPLOAD_DIR, filename));
      console.log(`${filename} -> ${THUMB_DIR_NAME}/${thumbnailFilename(filename)}`);
      created += 1;
    } catch (err) {
      console.error(`${filename}: failed — ${err.message}`);
    }
  }

  console.log(`Done. ${created} thumbnail(s) created, ${skipped} already existed.`);
}

run().catch((err) => {
  console.error('Thumbnail generation failed:', err);
  process.exit(1);
});
