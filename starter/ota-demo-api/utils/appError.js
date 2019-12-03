class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;

        // If the statusCode start with a '4', we want the
        // status to show as 'fail' and not 'error'.
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOperational = true;

        // Helps to troubleshoot issues easier.
        Error.captureStackTrace(this, this.constructor);
    }
}

// This makes the class available to other modules.
module.exports = AppError;