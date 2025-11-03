export const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    const response = {
        status: statusCode,
        message: message,
        data: null,
    };
    res.status(statusCode).json(response);
};
