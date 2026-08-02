import { Router } from 'express';
import { recommendWorkshops } from '../controllers/ai.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.post('/recommend', auth, recommendWorkshops);

export default router;
