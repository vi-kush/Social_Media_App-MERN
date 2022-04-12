const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next ) => {
    let error = { ...err };
    error.message = err.message;

    console.warn(err);

    if (err.code === 11000){
        const message = `Duplicate Key value Found.`;
        error = new ErrorResponse(message,400);
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message,400);
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};

module.exports = errorHandler;