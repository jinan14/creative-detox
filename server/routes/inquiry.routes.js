import { Router } from 'express';
import { createInquiry, getInquiries, updateInquiry, deleteInquiry } from '../controllers/inquiry.controller.js';
import auth from '../middleware/auth.middleware.js';
import admin from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', createInquiry);
router.get('/', auth, admin, getInquiries);
router.put('/:id', auth, admin, updateInquiry);
router.delete('/:id', auth, admin, deleteInquiry);

export default router;
