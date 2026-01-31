import express from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { UserRole } from '../types/enums';
import {
  getAllDoctors,
  getAnalytics,
} from '../controllers/admin.mongo.controller';

const router = express.Router();

// All routes require authentication + ADMIN role
router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

// Admin endpoints
router.get('/doctors', getAllDoctors);
router.get('/analytics', getAnalytics);

export default router;
