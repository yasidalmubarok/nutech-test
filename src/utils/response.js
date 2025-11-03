export const successResponse = (res, data, message, statusCode) => {
    return res.status(statusCode).json({
        status: statusCode === 200 ? 0 : statusCode,
        message,
        data,
    });
};
