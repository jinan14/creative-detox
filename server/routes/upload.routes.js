import { Router } from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import upload from '../middleware/upload.middleware.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', auth, admin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    uploadImage(req, res);
  });
});

export default router;
