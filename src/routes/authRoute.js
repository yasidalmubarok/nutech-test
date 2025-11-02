import * as authController from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

router.post('/register', authController.registerController);
router.post('/login', authController.loginController);

export default router;
