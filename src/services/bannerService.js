import { getAllBanners } from "../repositories/banner/bannerRepo.js";

export const fetchAllBanners = async () => {
    try {
        const banners = await getAllBanners();
        return banners;
    } catch (error) {
        console.error('Error fetching all banners:', error);
        throw error;
    }
};
