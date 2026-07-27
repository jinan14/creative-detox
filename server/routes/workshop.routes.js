import { Router } from 'express';
import {
  getWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from '../controllers/workshop.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getWorkshops);
router.post('/', auth, admin, createWorkshop);
router.put('/:id', auth, admin, updateWorkshop);
router.delete('/:id', auth, admin, deleteWorkshop);

export default router;
