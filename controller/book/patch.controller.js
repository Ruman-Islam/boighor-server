const bookServices = require('../../services/book/patch.services');


// UPDATE A BOOK
module.exports.updateABook = async (req, res, next) => {
    try {
        const result = await bookServices.updateABook(req.params, req.body, res);
        if (result === 0) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        if (!result) {
            return next("There was a server side error.");
        }
        return res.status(200).json({
            "message": "Book was updated successfully!",
        });
    } catch (err) {
        next(err);
    }
};


// UPDATE/ADD DISCOUNT TO ALL BOOKS
module.exports.updateDiscountToAll = async (req, res, next) => {
    try {
        const percentage = +req.params.percentage;
        const result = await bookServices.updateDiscountToAll(percentage);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Books were updated successfully!",
        });
    } catch (err) {
        return next("There was a server side error!");
    }
};

// ADD SPECIAL DISCOUNT ON A BOOK
module.exports.updateSpecialDiscount = async (req, res, next) => {
    try {
        const id = req.query.id;
        const percentage = +req.query.percentage;
        const result = await bookServices.updateSpecialDiscount(id, percentage, res)
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Book was updated successfully!",
        });
    } catch (err) {
        return next("There was a server side error!");
    }
};


// UPDATE FEATURED BOOK SELL COUNT
module.exports.updateBookSellCount = async (req, res, next) => {
    try {
        const result = await bookServices.updateBookSellCount(req.params);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Sell count updated!",
        });
    } catch (err) {
        return next("There was a server side error!");
    }
};


// UPDATE INDIVIDUAL BOOK RATING BY USER
module.exports.update_book_rating = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { rating } = req.query;
        const result = await bookServices.update_book_rating(id, rating, res, next);
        if (!result) {
            return res.status(500).json({
                "result": 'Something went wrong.',
            });
        }
        return res.status(200).json({
            "message": "Rating updated",
        });
    } catch (err) {
        return next("There was a server side error!");
    }
};