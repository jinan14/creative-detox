import { Router } from 'express';
import { createGypsumOrder, getGypsumOrders, updateGypsumOrder } from '../controllers/gypsum.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', auth, createGypsumOrder);
router.get('/', auth, admin, getGypsumOrders);
router.put('/:id', auth, admin, updateGypsumOrder);

export default router;
