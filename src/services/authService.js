import { generateToken } from '../middlewares/jwt.js';
import { createUser, getUserByEmail } from '../repositories/auth/authRepo.js';
import { createError as error } from '../utils/errorHandler.js';
import { hashPassword, comparePassword } from '../utils/password.js';

export const register = async (email, firstName, lastName, password) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw error(104, 'Email sudah dipakai', 409);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(email, firstName, lastName, hashedPassword);
    return newUser;
}

export const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw error(103, 'Email atau password salah', 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw error(103, 'Email atau password salah', 401);
    }

    const token = generateToken(user);

    return { user, token };
}

