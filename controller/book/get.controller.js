const bookServices = require('../../services/book/get.services');



// GET ALL BOOKS
exports.getAllBooks = async (req, res, next) => {
    try {
        const result = await bookServices.getAllBooks();
        if (result === 0) {
            return res.status(200).json({
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


// GET NEW ADDED BOOKS
exports.newlyAddedBooks = async (req, res) => {
    try {
        const result = await bookServices.newlyAddedBooks();
        if (result === 0) {
            return res.status(200).json({
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


// GET CHILDREN BOOKS
module.exports.getChildrenBooks = async (req, res, next) => {
    try {
        const result = await bookServices.getChildrenBooks();
        if (result === 0) {
            return res.status(200).json({
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


// BOOK SEARCH IMPLEMENTATION
module.exports.getSearchedBooks = async (req, res, next) => {
    try {
        const result = await bookServices.getSearchedBooks(req.query);
        if (result === 0) {
            return res.status(200).json({
                "result": result,
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


// GET PUBLICATION DROPDOWN LIST
module.exports.getPublication = async (req, res, next) => {
    try {
        const result = await bookServices.getPublication();
        if (result === 0) {
            return res.status(200).json({
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


// GET WRITER DROPDOWN LIST
module.exports.getWriter = async (req, res, next) => {
    try {
        const result = await bookServices.getWriter();
        if (result === 0) {
            return res.status(200).json({
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


// GET FEATURED BOOKS
module.exports.getFeaturedBooks = async (req, res, next) => {
    try {
        const result = await bookServices.getFeaturedBooks();
        if (result === 0) {
            return res.status(200).json({
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


// GET BESTSELLING BOOK
module.exports.getBestSellingBook = async (req, res, next) => {
    try {
        const result = await bookServices.getBestSellingBook();
        if (result === 0) {
            return res.status(200).json({
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


// GET A BOOK
module.exports.getABook = async (req, res, next) => {
    try {
        const result = await bookServices.getABook(req.params, res);
        if (result === 0) {
            return res.status(200).json({
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


// GET SPECIAL OFFER
module.exports.getSpecialOfferedBook = async (req, res, next) => {
    try {
        const result = await bookServices.getSpecialOfferedBook();
        if (result === 0) {
            return res.status(200).json({
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