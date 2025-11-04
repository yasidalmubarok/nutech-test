import { query } from '../db.js';

export const createTransaction = async (userId, transactionData) => {
    const { invoiceNumber, transactionType, description, totalAmount } = transactionData;
    const client = await (await import('../db.js')).pool.connect(); 
    try {
        await client.query('BEGIN');
        const createSql = `INSERT INTO transactions
                         (user_id, invoice_number, transaction_type, description, total_amount, created_on) 
                         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
                         RETURNING id`;
        const values = [userId, invoiceNumber, transactionType, description, totalAmount];
        const result = await client.query(createSql, values);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error creating transaction:', err);
        throw err;
    } finally {
        client.release();
    }
};

export const getLastInvoiceNumber = async (date) => {
    const dateStr = formatDateForInvoice(date);
    const result = await query(
        `SELECT invoice_number FROM transactions
        WHERE invoice_number LIKE $1
        ORDER BY created_on DESC
        LIMIT 1`, 
        [`INV${dateStr}%`]
    );
    return result.rows[0] ? result.rows[0].invoice_number : null;
}

export const generateInvoiceNumber = async () => {
    const date = new Date();
    const formattedDate = formatDateForInvoice(date);

    const lastInvoiceSql = await getLastInvoiceNumber(date);
    
    let newSequence = 1;

    if (lastInvoiceSql) {
        const lastSequenceStr = parseInt(lastInvoiceSql.split('-')[1], 10);
        newSequence = lastSequenceStr + 1;
    }

    const paddedSequence = newSequence.toString().padStart(3, '0');
    return `INV${formattedDate}-${paddedSequence}`;
};

export const formatDateForInvoice = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}${month}${year}`;
};

export const getTransactionHistoryByUserID = async (userId, offset = 0, limit = 10) => {
    const getSql = `SELECT id, invoice_number, transaction_type, description, total_amount, created_on
                    FROM transactions
                    WHERE user_id = $1
                    ORDER BY created_on DESC
                    OFFSET $2 LIMIT $3`;
    const values = [userId, offset, limit];
    try {
        const result = await query(getSql, values);
        return result.rows;
    } catch (err) {
        console.error('Error fetching transaction history:', err);
        throw err;
    }
};

export const getTransactionCountByUserID = async (userId) => {
    const countSql = `SELECT COUNT(*) AS total
                      FROM transactions
                      WHERE user_id = $1`;
    const values = [userId];
    try {
        const result = await query(countSql, values);
        return result.rows[0].total;
    } catch (err) {
        console.error('Error fetching transaction count:', err);
        throw err;
    }
};
