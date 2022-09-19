const errorHandler = (error, req, res, next) => {
    if (Array.isArray(error)) {
        const errArr = error[0].split(".");
        return res.status(+errArr[1]).json({
            "statusCode": errArr[1],
            "message": errArr[0]
        });
    }
    if (!res.headersSent) {
        return res.json({
            "message": error
        });
    }
    // if (error.includes("No data found.")) {
    //     return res.status(404).json({
    //         "statusCode": 404,
    //         "message": "No data found."
    //     });
    // }
    if (error.includes("There was a server side error.")) {
        return res.status(500).json({
            "statusCode": 500,
            "message": "There was a server side error."
        });
    }
}

module.exports = errorHandler;