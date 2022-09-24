const errorHandler = (err, req, res, next) => {
    if (Array.isArray(err)) {
        const errArr = err[0].split(".");
        return res.status(+errArr[1]).json({
            "statusCode": errArr[1],
            "message": errArr[0]
        });
    }
    if (err.name === 'ValidationError') {
        const error = Object.values(err.errors).map(val => val.message);
        const errArr = error[0].split(".");
        return res.status(+errArr[1]).json({
            "statusCode": errArr[1],
            "message": errArr[0]
        });
    }
    if (err.name === 'mongoServerError' && err.code === 11000) {
        return res.status(400).json({
            "statusCode": 400,
            "message": "Email has already registered.400"
        });
    }
    if (!res.headersSent) {
        return res.json({
            "message": err
        });
    }
    // // if (error.includes("No data found.")) {
    // //     return res.status(404).json({
    // //         "statusCode": 404,
    // //         "message": "No data found."
    // //     });
    // // }

    // if (err.includes("There was a server side error.")) {
    //     return res.status(500).json({
    //         "statusCode": 500,
    //         "message": "There was a server side error."
    //     });
    // }
}

module.exports = errorHandler;