import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Card-sized WebP copies of uploaded images live in uploads/thumbs/, named
// after the original with a .webp extension:
//   uploads/1785...-abc.jpeg -> uploads/thumbs/1785...-abc.webp
// The frontend derives the thumbnail URL from the image path the same way
// (see resolveThumbnailUrl in src/utils/resolveImageUrl.js), so no extra DB
// field is needed. 600x768 covers the h-96 gallery cards at 2x density.
export const THUMB_DIR_NAME = 'thumbs';
const MAX_WIDTH = 600;
const MAX_HEIGHT = 768;
const QUALITY = 70;

export const THUMBNAILABLE_EXT_RE = /\.(jpe?g|png|webp)$/i;

export function thumbnailFilename(filename) {
  return filename.replace(/\.[^.]+$/, '.webp');
}

export async function createThumbnail(filePath) {
  const thumbDir = path.join(path.dirname(filePath), THUMB_DIR_NAME);
  await fs.mkdir(thumbDir, { recursive: true });

  const thumbPath = path.join(thumbDir, thumbnailFilename(path.basename(filePath)));
  await sharp(filePath)
    .rotate() // apply EXIF orientation so phone photos aren't sideways
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(thumbPath);

  return thumbPath;
}
