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