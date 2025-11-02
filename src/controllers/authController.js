import { register, login } from "../services/authService.js"
import { createError as error } from "../utils/errorHandler.js";
import { emailValidator, passwordValidator } from "../validators/validation.js";
import { successResponse } from "../utils/response.js";

export const registerController = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        if (!email || !firstName || !lastName || !password) {
            throw error(102, 'kolom harus diisi semua')
        }

        if (!emailValidator(email)) {
            throw error(102, 'Parameter email tidak sesuai format');
        }

        if (!passwordValidator(password)) {
            throw error(102, 'Password harus minimal 8 karakter, mengandung huruf kecil, dan angka');
        }
        const user = await register( email, firstName, lastName, password );
        return successResponse(res, null, 'registrasi berhasil', 201);
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw error(102, 'kolom harus diisi semua')
        }

        if (!emailValidator(email)) {
            throw error(102, 'Parameter email tidak sesuai format');
        }

        const { token } = await login(email, password);
        return successResponse(res, { token }, 'login sukses', 200);
    } catch (error) {
        next(error);
    }
};
