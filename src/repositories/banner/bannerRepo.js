import { query } from '../db.js';

export const getAllBanners = async () => {
    const sql = `SELECT * FROM banners`;
    try {
        const result = await query(sql);
        return result.rows;
    } catch (err) {
        console.error('Error fetching all banners:', err);
        throw err;
    }
};
