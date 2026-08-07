export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  // Relative path, not an absolute URL baked to whichever host received this
  // upload — the frontend resolves it against the current API origin at
  // render time (see src/utils/resolveImageUrl.js). Keeps images working
  // whether the upload happened against localhost or the deployed backend.
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url });
};
