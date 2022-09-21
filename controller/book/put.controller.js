const { Types: { ObjectId } } = require('mongoose');
const Book = require('../../models/Book');
const bookServices = require('../../services/book/put.services');


// ADD REVIEW TO THE BOOK
module.exports.addReviewToBook = async (req, res, next) => {
    try {
        const result = await bookServices.addReviewToBook(req.body, res);
        if (!result) {
            return res.status(500).json({
                "result": 'Internal server error.',
            });
        }
        return res.status(200).json({
            "message": "Review added successfully",
        });
    } catch (err) {
        return next("There was a server side error!");
    }
};