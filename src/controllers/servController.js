import { fetchAllServices } from "../services/servService.js";
import { successResponse } from "../utils/response.js";

export const getAllServices = async (req, res, next) => {
    try {
        const services = await fetchAllServices();
        return successResponse(res, services, 'Sukses', 200);
    } catch (error) {
        next(error);
    }
};