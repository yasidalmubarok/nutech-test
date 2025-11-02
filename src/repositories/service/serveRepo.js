import { query } from '../db.js';

export const getAllServices = async () => {
    const sql = `SELECT service_code, service_name, service_icon, service_tariff FROM services`; 
    try {
        const result = await query(sql);
        return result.rows;
    } catch (err) {
        console.error('Error fetching all services:', err);
        throw err;
    }
};

export const getServiceByCode = async (serviceCode) => {
    const sql = `SELECT service_code, service_name, service_icon, service_tariff 
                 FROM services 
                 WHERE service_code = $1`;
    const values = [serviceCode];
    try {
        const result = await query(sql, values);
        if (result.rows.length === 0) {
            return null;
        }
        return {
            serviceCode: result.rows[0].service_code,
            serviceName: result.rows[0].service_name,
            serviceIcon: result.rows[0].service_icon,
            serviceTariff: result.rows[0].service_tariff
        };
    } catch (err) {
        console.error('Error fetching service by code:', err);
        throw err;
    }
};
