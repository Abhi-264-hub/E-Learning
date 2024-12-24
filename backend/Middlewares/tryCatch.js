const tryCatch = (handler) => {
    return (req, res, next) => {
        handler(req, res, next).catch((error) => {
            res.status(500).json({
                message: error.message,
            });
        });
    };
};
export default tryCatch;
