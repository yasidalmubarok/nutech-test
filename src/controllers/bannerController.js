import { fetchAllBanners } from "../services/bannerService.js";
import { successResponse } from "../utils/response.js";

export const getAllBanners = async (req, res, next) => {
    try {
        const banners = await fetchAllBanners();
        successResponse(res, banners, 'Sukses', 200);
    } catch (error) {
        next(error);
    }
};
