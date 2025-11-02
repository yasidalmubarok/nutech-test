import { getBalanceByUserID, updateBalanceByUserID } from "../repositories/balance/balanceRepo.js";
import { createTransaction, generateInvoiceNumber, getTransactionHistoryByUserID } from "../repositories/transaction/transactionRepo.js";
import { getServiceByCode } from "../repositories/service/serveRepo.js";
import { createError as error } from "../utils/errorHandler.js";

export const fetchBalance = async (userId) => {
    const balance = await getBalanceByUserID(userId);
    if (balance === undefined || balance === null) {
        throw error(404, 'User not found', 404);
    }
    return balance;
};

export const topUpBalance = async (userId, amount) => {
    const invoiceNumber = await generateInvoiceNumber();
    const transactionData = {
        invoiceNumber,
        transaction_type: 'TOPUP',
        description: 'Top Up Balance',
        totalAmount: amount,
    };

    await createTransaction(userId, transactionData);

    const updateBalance = await updateBalanceByUserID(userId, amount);
    return updateBalance;
};

export const createTrx = async (userId, srvCode) => {
    try {
        const service = await getServiceByCode(srvCode);

        const currentBalance = await getBalanceByUserID(userId);
        if (currentBalance < service.serviceTariff) {
            throw error(102, 'balance kurang', 400);
        }

        const createdOn = new Date();

        const invoiceNumber = await generateInvoiceNumber();
        const trxData = {
            invoiceNumber,
            transactionType: 'PAYMENT',
            description: service.serviceName,
            totalAmount: service.serviceTariff,
        };

        await createTransaction(userId, trxData);

        await updateBalanceByUserID(userId, -service.serviceTariff);
        return {
            invoiceNumber: invoiceNumber,
            serviceCode: srvCode,
            serviceName: service.serviceName,
            transactionType: 'PAYMENT',
            totalAmount: service.serviceTariff,
            createdOn: createdOn
        };
    } catch (err) {
        console.error('Error creating transaction:', err);
        throw error(500, 'Internal Server Error');
    }
};

export const fetchTransactionHistory = async (userId) => {
    const history = await getTransactionHistoryByUserID(userId);
    if (!history || history.length === 0) {
        throw error(404, 'No transaction history found', 404);
    }
    return history;
};
