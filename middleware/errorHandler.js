const errorHandler = (error, req, res, next) => {
    if (!res.headersSent) {
        const errArr = error[0].split(".");
        return res.status(+errArr[1]).json({
            "error": errArr[1],
            "message": errArr[0]
        });
    }
    return next(error);
}

module.exports = errorHandler;