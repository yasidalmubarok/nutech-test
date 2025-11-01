export const successResponse = (res, data, message, statusCode) => {
    return res.status(statusCode).json({
        status: 0,
        message,
        data,
    });
};
