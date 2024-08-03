import { Router } from 'express';

import { login, dashboard } from '../controllers/authController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.get('/dashboard', authMiddleware, dashboard);

export default router;
