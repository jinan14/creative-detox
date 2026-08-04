import { Router } from 'express';
import { generateDescription, recommendWorkshops } from '../controllers/ai.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/recommend', auth, recommendWorkshops);
router.post('/generate-description', auth, admin, generateDescription);

export default router;
