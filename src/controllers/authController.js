import { register, login } from "../services/authService.js"
import { createError as error } from "../utils/errorHandler.js";
import { emailValidator, passwordValidator } from "../validators/validation.js";
import { successResponse } from "../utils/response.js";

/**
 * @swagger
 * /api/registration:
 *   post:
 *     summary: Register a new user
 *     description: API untuk melakukan registrasi user baru
 *     tags:
 *       - 1. Module Membership
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: kingmu@mufc.com
 *               first_name:
 *                 type: string
 *                 example: King
 *               last_name:
 *                 type: string
 *                 example: Mufc
 *               password:
 *                 type: string
 *                 format: password
 *                 example: kingmu1234
 *     responses:
 *       200:
 *         description: Registrasi berhasil
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
 *                   example: Registrasi berhasil silahkan login
 *                 data:
 *                   type: null
 *                   example: null
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
 *                   example: Parameter email tidak sesuai format
 *                 data:
 *                   type: null
 *                   example: null
 */
export const registerController = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !lastName || !password) {
            throw error(102, 'kolom harus diisi semua', 400);
        }

        if (!emailValidator(email)) {
            throw error(102, 'Parameter email tidak sesuai format', 400);
        }

        if (!passwordValidator(password)) {
            throw error(102, 'Password harus minimal 8 karakter, mengandung huruf kecil, dan angka', 400);
        }
        const user = await register( email, firstName, lastName, password );
        return successResponse(res, null, 'registrasi berhasil', 201);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: API untuk melakukan login dan mendapatkan JWT token
 *     tags:
 *       - 1. Module Membership
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: kingmu@mufc.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: abcdef1234
 *     responses:
 *       200:
 *         description: Login berhasil
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
 *                   example: Login Sukses
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - Email atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 103
 *                 message:
 *                   type: string
 *                   example: Username atau password salah
 *                 data:
 *                   type: null
 *                   example: null
 */
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw error(102, 'kolom harus diisi semua', 400);
        }

        if (!emailValidator(email)) {
            throw error(102, 'Parameter email tidak sesuai format', 400);
        }

        const { token } = await login(email, password);
        return successResponse(res, { token }, 'login sukses', 200);
    } catch (error) {
        next(error);
    }
};
