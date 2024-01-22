// authRoutes.js
import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateToken, logoutUser); // Asegúrate de agregar el middleware de autenticación

export default router;
