const errorHandler = (error, req, res, next) => {
    if (Array.isArray(error)) {
        const errArr = error[0].split(".");
        return res.status(+errArr[1]).json({
            "error": errArr[1],
            "message": errArr[0]
        });
    }
    if (!res.headersSent) {
        return res.status(500).json({
            "error": 500,
            "message": error
        });
    }
}

module.exports = errorHandler;