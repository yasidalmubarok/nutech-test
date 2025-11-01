import { Pool } from 'pg';
import parse from ('pg-connection-string');
import dotenv from('dotenv');
dotenv.config();

const connection = process.env.DATABASE_URL
    ? parse(process.env.DATABASE_URL)
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    };

export const pool = new Pool({
    user: connection.user,
    password: connection.password,
    host: connection.host,
    port: connection.port,
    database: connection.database,
    ssl: process.env.DB_SSL === 'required' ? { rejectUnauthorized: false } : false,
});

export async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}

module.exports = { pool, query };