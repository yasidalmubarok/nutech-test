import { generateToken } from '../middlewares/jwt.js';
import { createUser, getUserByEmail } from '../repositories/authRepo.js';
import { createError as error } from '../utils/errorHandler.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { passwordValidator } from '../validators/validation.js';

export const register = async (email, firstName, lastName, password) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw error(104, 'Email sudah dipakai');
    }

    if (!passwordValidator(password)) {
        throw error(102, 'Password tidak memenuhi persyaratan');
    }

    if (!emailValidator(email)) {
        throw error(102, 'Format email tidak valid');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(email, firstName, lastName, hashedPassword);
    return newUser;
}

export const login = async (email, password) => {
    if (!emailValidator(email)) {
        throw error(102, 'Format email tidak valid');
    }

    const user = await getUserByEmail(email);
    if (!user) {
        throw error(103, 'Email atau password salah');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw error(103, 'Email atau password salah');
    }

    const token = generateToken(user);
    return { user, token };
}

