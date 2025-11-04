import { fetchAllServices } from "../services/servService.js";
import { successResponse } from "../utils/response.js";

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     description: API untuk mendapatkan list Service/Layanan PPOB
 *     tags:
 *       - 2. Module Information
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
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: PAJAK
 *                       service_name:
 *                         type: string
 *                         example: Pajak PBB
 *                       service_icon:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff:
 *                         type: integer
 *                         example: 40000
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
export const getAllServices = async (req, res, next) => {
    try {
        const services = await fetchAllServices();
        return successResponse(res, services, 'Sukses', 200);
    } catch (error) {
        next(error);
    }
};