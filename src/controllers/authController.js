import { register, login } from "../services/authService.js"
import * as validate from "../validators/validation.js";
import { successResponse } from "../utils/response.js";

/**
 * @swagger
 * /api/auth/register:
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
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: kingmu@mufc.com
 *               firstName:
 *                 type: string
 *                 example: King
 *               lastName:
 *                 type: string
 *                 example: Mufc
 *               password:
 *                 type: string
 *                 format: password
 *                 example: kingmu1234
 *     responses:
 *       201:
 *         description: Registrasi berhasil silahkan login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Parameter email tidak sesuai format
 *                 data:
 *                   type: null
 *                   example: null
 *      
 */
export const registerController = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        const validationError = validate.validateRegisterInput({ email, firstName, lastName, password });
        if (validationError) {
            throw validationError;
        }

        const user = await register( email, firstName, lastName, password );

        return successResponse(res, null, 'registrasi berhasil', 201);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /api/auth/login:
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
 *                 example: kingmu1234
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login Sukses
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request - Kolom harus diisi semua
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Kolom harus diisi semua
 *                 data:
 *                   type: null
 *                   example: null
 *       401:
 *         description: Unauthorized - Email atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
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

        const validationError = validate.validateLoginInput({ email, password });
        if (validationError) {
            throw validationError;
        }

        const { token } = await login(email, password);

        return successResponse(res, { token }, 'login sukses', 200);
    } catch (error) {
        next(error);
    }
};
