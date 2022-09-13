const { Types: { ObjectId } } = require('mongoose');
const Book = require('../../models/Book');


// ADD SPECIAL DISCOUNT ON A BOOK
module.exports.updateSpecialDiscount = async (req, res, next) => {
    try {
        const id = req.query.id;
        const percentage = +req.query.percentage;
        const book = await Book.findOne({ _id: id });
        await Book.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    price: Math.round(book.price - (percentage * book.price) / 100),
                    previousPrice: Math.round(book.price),
                    discount: percentage,
                }
            }, { new: true, useFindAndModify: false, });
        res.status(200).json({
            "message": "Success"
        });
    } catch (err) {
        next("There was a server side error!");
    }
};
