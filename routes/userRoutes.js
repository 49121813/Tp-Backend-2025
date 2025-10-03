import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', verifyToken, verifyAdmin, createUser);
router.post('/login', loginUser);

export default router;
