import { fetchBalance, topUpBalance, createTrx, fetchTransactionHistory } from "../services/balanceService.js";
import { successResponse } from "../utils/response.js";
import { createError as error } from "../utils/errorHandler.js";

/**
 * @swagger
 * /api/balance:
 *   get:
 *     summary: Get user balance
 *     description: API untuk mendapatkan informasi balance / saldo terakhir dari User
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Get Balance Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1000000
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: null
 *                   example: null
 */
export const getBalance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const balance = await fetchBalance(userId);
        return successResponse(res, { balance }, 'Sukses', 200);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/topup:
 *   post:
 *     summary: Top up user balance
 *     description: API untuk melakukan top up balance / saldo dari User
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - top_up_amount
 *             properties:
 *               top_up_amount:
 *                 type: number
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Top Up berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Top Up Balance berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1100000
 *       400:
 *         description: Bad request - Parameter tidak sesuai format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: null
 *                   example: null
 */
export const topUp = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { top_up_amount } = req.body;
        if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
            throw error(102, 'Hanya angka dan lebih besar dari nol', 400);
        }

        const updatedBalance = await topUpBalance(userId, top_up_amount);
        return successResponse(res, { balance: updatedBalance }, 'Top up berhasil', 200);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Create transaction
 *     description: API untuk melakukan transaksi pembayaran layanan
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_code
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PLN
 *     responses:
 *       200:
 *         description: Transaksi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Transaksi berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: INV17082023-001
 *                     service_code:
 *                       type: string
 *                       example: PLN
 *                     service_name:
 *                       type: string
 *                       example: Listrik
 *                     transaction_type:
 *                       type: string
 *                       example: PAYMENT
 *                     total_amount:
 *                       type: number
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-08-17T10:30:00.000Z
 *       400:
 *         description: Bad request - Service tidak ditemukan atau balance tidak mencukupi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Service atau Layanan tidak ditemukan
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: null
 *                   example: null
 */
export const createTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { service_code } = req.body;

        const updatedBalance = await createTrx(userId, service_code);
        return successResponse(res, { updatedBalance }, 'Transaksi berhasil', 200);
    } catch (err) {
        next(err);
    }
};

/**
 * @swagger
 * /api/transaction/history:
 *   get:
 *     summary: Get transaction history
 *     description: API untuk mendapatkan informasi history transaksi
 *     tags:
 *       - 3. Module Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Offset untuk pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman
 *     responses:
 *       200:
 *         description: Sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Get History Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     limit:
 *                       type: integer
 *                       example: 3
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           invoice_number:
 *                             type: string
 *                             example: INV17082023-001
 *                           transaction_type:
 *                             type: string
 *                             example: TOPUP
 *                           description:
 *                             type: string
 *                             example: Top Up balance
 *                           total_amount:
 *                             type: number
 *                             example: 100000
 *                           created_on:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-08-17T10:30:00.000Z
 *       401:
 *         description: Unauthorized - Token tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak valid atau kadaluwarsa
 *                 data:
 *                   type: null
 *                   example: null
 */
export const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await fetchTransactionHistory(userId);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        return successResponse(res, { offset, limit, record: history }, 'Transaction history fetched successfully', 200);
    } catch (err) {
        next(err);
    }
};
