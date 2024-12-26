const tryCatch = (handler) => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next); // Pass errors to the default Express error handler
    };
};

export default tryCatch;

