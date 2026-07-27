import { Router } from 'express';
import { createRegistration, getRegistrations } from '../controllers/registration.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', auth, createRegistration);
router.get('/', auth, admin, getRegistrations);

export default router;
