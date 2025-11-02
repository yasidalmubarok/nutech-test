import { getAllServices } from "../repositories/service/serveRepo.js";

export const fetchAllServices = async () => {
    try {
        const services = await getAllServices();
        return services;
    } catch (error) {
        throw error(500, 'Internal Server Error');
    }
};