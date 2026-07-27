import { Router } from 'express';
import { createOrder } from '../controllers/order.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', auth, createOrder);

export default router;
