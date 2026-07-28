import { Router } from 'express';
import { getAdminLogs } from '../controllers/adminLog.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.get('/logs', auth, admin, getAdminLogs);

export default router;
