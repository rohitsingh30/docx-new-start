import express from 'express';
import { login, logout, getCurrentUser } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

export default router;
