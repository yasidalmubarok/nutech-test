import { query } from '../db.js';

export const createUser = async (email, firstName, lastName, password) => {
    const createSql = `INSERT INTO users (email, first_name, last_name, password, balance)
                        VALUES ($1, $2, $3, $4, 0) RETURNING id, email`;
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
    const getSql = `SELECT id, email, first_name, last_name, password, balance FROM users WHERE email = $1`;
    const values = [email];
    try {
        const result = await query(getSql, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching user by email:', err);
        throw err;
    }
};