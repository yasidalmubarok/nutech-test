import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createError as error } from '../utils/errorHandler.js';
dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return next(error(401, 'Token tidak tidak valid atau kadaluwarsa'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(error(401, 'Token tidak tidak valid atau kadaluwarsa'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(error(401, 'Token tidak tidak valid atau kadaluwarsa'));
    }
};

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '12h' }
    );
};
