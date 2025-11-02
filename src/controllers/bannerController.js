import { fetchAllBanners } from "../services/bannerService.js";
import { successResponse } from "../utils/response.js";

/**
 * @swagger
 * /api/banner:
 *   get:
 *     summary: Get all banners
 *     description: API untuk mendapatkan list banner
 *     tags:
 *       - 2. Module Information
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
 *                       banner_name:
 *                         type: string
 *                         example: Banner 1
 *                       banner_image:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       description:
 *                         type: string
 *                         example: Lerem Ipsum Dolor sit amet
 */
export const getAllBanners = async (req, res, next) => {
    try {
        const banners = await fetchAllBanners();
        successResponse(res, banners, 'Sukses', 200);
    } catch (error) {
        next(error);
    }
};
