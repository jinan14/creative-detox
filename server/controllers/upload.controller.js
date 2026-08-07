import fs from 'fs/promises';
import path from 'path';
import convert from 'heic-convert';

const HEIC_EXT_RE = /\.hei[cf]$/i;

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  let { filename, path: filePath } = req.file;

  // iPhones save photos as HEIC by default, which most browsers (Chrome,
  // Firefox, Android, Windows — everything but Safari) can't render in an
  // <img> tag. Convert to JPEG on upload so it displays everywhere.
  if (HEIC_EXT_RE.test(filename)) {
    try {
      const inputBuffer = await fs.readFile(filePath);
      const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.9 });

      const jpegFilename = filename.replace(HEIC_EXT_RE, '.jpg');
      const jpegPath = path.join(path.dirname(filePath), jpegFilename);

      await fs.writeFile(jpegPath, outputBuffer);
      await fs.unlink(filePath);

      filename = jpegFilename;
    } catch (err) {
      return res.status(400).json({ message: `Failed to convert HEIC image: ${err.message}` });
    }
  }

  // Relative path, not an absolute URL baked to whichever host received this
  // upload — the frontend resolves it against the current API origin at
  // render time (see src/utils/resolveImageUrl.js). Keeps images working
  // whether the upload happened against localhost or the deployed backend.
  const url = `/uploads/${filename}`;
  res.status(201).json({ url });
};
