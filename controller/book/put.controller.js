const { Types: { ObjectId } } = require('mongoose');
const Book = require('../../models/Book');
const bookServices = require('../../services/book/put.services');


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
