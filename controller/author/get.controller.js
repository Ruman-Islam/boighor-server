const authorServices = require('../../services/author/get.services');


// GET AN AUTHOR
module.exports.getAnAuthor = async (req, res, next) => {
    try {
        const { query } = req.query;
        const result = await authorServices.getAnAuthor(query);
        if (result === 0) {
            return res.status(404).json({
                "result": 'No data found',
            });
        }
        if (!result) {
            return next("There was a server side error.");
        }
        return res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next(err);
    }
};

// POST AN AUTHOR
module.exports.postAnAuthor = async (req, res, next) => {
    try {
        const result = await authorServices.postAnAuthor(req.body, next);
        if (!result) {
            return next("There was a server side error.");
        }
        return res.status(200).json({
            "result": "Author information inserted successfully",
        });
    } catch (err) {
        next(err);
    }
};