import { Router } from 'express';
import { createOrder, getOrders, updateOrder } from '../controllers/order.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', auth, createOrder);
router.get('/', auth, admin, getOrders);
router.put('/:id', auth, admin, updateOrder);

export default router;
