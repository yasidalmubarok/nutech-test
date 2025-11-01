import { query } from '../repositories/db.js';

export const createUser = async (email, firstName, lastName, password) => {
    const createSql = `INSERT INTO users (email, first_name, last_name, password)
                        VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [email, firstName, lastName, password];
    try {
        const result = await query(createSql, values);
        console.log('User created with ID:', result.rows[0].id);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

export const getUserByEmail = async (email) => {
    const getSql = `SELECT id FROM users WHERE email = $1`;
    const values = [email];
    try {
        const result = await query(getSql, values);
        console.log('User fetched with Email:', result.rows[0]?.email);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user by email:', err);
        throw err;
    }
};