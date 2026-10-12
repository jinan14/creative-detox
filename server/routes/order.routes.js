import { Router } from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/order.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', auth, createOrder);
router.get('/', auth, admin, getOrders);
router.put('/:id', auth, admin, updateOrder);
router.delete('/:id', auth, admin, deleteOrder);

export default router;
