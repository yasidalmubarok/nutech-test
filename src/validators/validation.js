import { createError as error } from "../utils/errorHandler.js";

export const validateRegisterInput = (input) => {
    const { email, password, firstName, lastName } = input;

    if (!email || !firstName || !lastName || !password) {
        throw error(400, 'kolom harus diisi semua');
    }   

    if (!emailValidator(email)) {
        return error(400, 'Parameter email tidak sesuai format');
    }
    if (!nameValidator(firstName)) {
        return error(400, 'Parameter firstName tidak sesuai format');
    }
    if (!nameValidator(lastName)) {
        return error(400, 'Parameter lastName tidak sesuai format');
    }
    if (!passwordValidator(password)) {
        return error(400, 'Password harus minimal 8 karakter, mengandung huruf kecil, dan angka');
    }

    return null;
};

export const validateLoginInput = (input) => {
    const { email, password } = input;
    if (!email || !password) {
        throw error(400, 'kolom harus diisi semua');
    }

    if (!emailValidator(email)) {
        return error(400, 'Parameter email tidak sesuai format');
    }

    return null;
};

export const validateTopUpInput = (input) => {
    const { top_up_amount } = input;

    if (!top_up_amount === undefined){
        throw error(400, 'Parameter tidak boleh kosong')
    }

    if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
        throw error(400, 'Hanya angka dan lebih besar dari nol');
    }

    return null;
};

export const passwordValidator = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
        password.length >= minLength &&
        hasLowerCase &&
        hasDigit
    );
};

export const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const nameValidator = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
}