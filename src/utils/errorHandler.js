export const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    return res.status(status).json({
        status,
        message,
        data: null,
    });
};
