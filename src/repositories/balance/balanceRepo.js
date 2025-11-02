import { query } from '../db.js';

export const getBalanceByUserID = async (userId) => {
    const getSql = `SELECT balance FROM users WHERE id = $1`;
    const values = [userId];
    try {
        const result = await query(getSql, values);
        return result.rows[0].balance;
    } catch (err) {
        console.error('Error fetching user balance:', err);
        throw err;
    }
};
export const updateBalanceByUserID = async (userId, amount) => {
    const client = await (await import('../db.js')).pool.connect();
    try {
        await client.query('BEGIN');
        
        const updateSql = `UPDATE users 
                        SET balance = balance + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 
                        RETURNING balance`;
        const values = [amount, userId];
        
        const result = await client.query(updateSql, values);
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }

        await client.query('COMMIT');
        return result.rows[0].balance;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    
};