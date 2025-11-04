import { Pool } from 'pg';
import parse from 'pg-connection-string';
import dotenv from'dotenv';
dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});

export async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    } finally {
        client.release();
    }
}

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.on('connect', (client) => {
    console.log('New client connected to the database');
});