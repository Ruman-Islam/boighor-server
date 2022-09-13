const Book = require('../../models/Book');
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
        next("There was a server side error!");
    }
};


// UPDATE FEATURED BOOK SELL COUNT
module.exports.updateBookSellCount = async (req, res, next) => {
    try {
        await Book.findByIdAndUpdate(
            { _id: req.params.id }, { $inc: { sellCount: 1 } });
        res.status(200).json({
            "message": "Success"
        })
    } catch (err) {
        next("There was a server side error!");
    }
};