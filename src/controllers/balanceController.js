import { fetchBalance, topUpBalance, createTrx, fetchTransactionHistory } from "../services/balanceService.js";
import { successResponse } from "../utils/response.js";
import { createError as error } from "../utils/errorHandler.js";

export const getBalance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const balance = await fetchBalance(userId);
        return successResponse(res, { balance }, 'Sukses', 200);
    } catch (err) {
        next(err);
    }
};

export const topUp = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { top_up_amount } = req.body;
        if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
            throw error(102, 'Hanya angka dan lebih besar dari nol', 400);
        }

        const updatedBalance = await topUpBalance(userId, top_up_amount);
        return successResponse(res, { balance: updatedBalance }, 'Top up berhasil', 200);
    } catch (err) {
        next(err);
    }
};

export const createTransaction = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { service_code } = req.body;

        const updatedBalance = await createTrx(userId, service_code);
        return successResponse(res, { updatedBalance }, 'Transaksi berhasil', 200);
    } catch (err) {
        next(err);
    }
};

export const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await fetchTransactionHistory(userId);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        return successResponse(res, { offset, limit, record: history }, 'Transaction history fetched successfully', 200);
    } catch (err) {
        next(err);
    }
};
