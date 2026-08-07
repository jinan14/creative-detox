import { Router } from 'express';
import {
  getArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  reorderArtworks,
  deleteArtwork,
} from '../controllers/artwork.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getArtworks);
router.put('/reorder', auth, admin, reorderArtworks);
router.get('/:id', getArtworkById);
router.post('/', auth, admin, createArtwork);
router.put('/:id', auth, admin, updateArtwork);
router.delete('/:id', auth, admin, deleteArtwork);

export default router;
