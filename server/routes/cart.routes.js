import { Router } from 'express';
import { getCart, addItem, removeItem, clearCart } from '../controllers/cart.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', auth, getCart);
router.post('/items', auth, addItem);
router.delete('/items/:artworkId', auth, removeItem);
router.delete('/', auth, clearCart);

export default router;
