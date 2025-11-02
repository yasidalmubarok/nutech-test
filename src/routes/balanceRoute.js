import express from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import { getBalance, topUp, createTransaction, getTransactionHistory } from '../controllers/balanceController.js';

const router = express.Router();

router.get('/balance', verifyToken, getBalance);
router.post('/topup', verifyToken, topUp);
router.post('/transaction', verifyToken, createTransaction);
router.get('/transaction/history', verifyToken, getTransactionHistory);

export default router;
