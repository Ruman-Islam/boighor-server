const { Types: { ObjectId }, model } = require('mongoose');
const book_schema = require('../../schemas/bookSchema');
const Book = new model("Book", book_schema);


// UPDATE A BOOK
module.exports.updateABook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedBook = req.body;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                "error": 400,
                "message": "ID is not valid."
            });
        }
        await Book.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    ...updatedBook
                }
            });
        return res.status(200).json({
            "message": "Book was updated successfully!",
        });
    } catch (err) {
        next("There was a server side error!");
    }
};


// UPDATE/ADD DISCOUNT TO ALL BOOKS
module.exports.updateDiscount = async (req, res, next) => {
    try {
        const percentage = +req.params.percentage;
        const result = await Book.find({});
        const updatedBooks = result?.map((book) => {
            return {
                ...book.toObject(),
                price: Math.round(book.price - (percentage * book.price) / 100),
                previousPrice: Math.round(book.price),
                discount: percentage,
            }
        });
        await Book.deleteMany({});
        await Book.insertMany(updatedBooks);
        res.status(200).json({
            "message": "Success"
        });
    } catch (err) {
        next("There was a server side error!");
    }
};


// ADD SPECIAL DISCOUNT ON A BOOK
module.exports.addSpecialDiscount = async (req, res, next) => {
    const id = req.query.id;
    const percentage = +req.query.percentage;
    try {
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