const { Types: { ObjectId }, model } = require('mongoose');
const book_schema = require('../../schemas/bookSchema');
const Book = new model("Book", book_schema);



// ADD A BOOK
module.exports.addABook = async (req, res, next) => {
    try {
        const newBook = req.body;
        await Book.create(newBook);
        return res.status(200).json({
            "message": "Inserted successfully!",
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const error = Object.values(err.errors).map(val => val.message);
            next(error);
        } else {
            next(err);
        }
    }
};

// ADD MANY BOOKS
module.exports.addManyBooks = async (req, res, next) => {
    try {
        const newBooks = req.body;
        await Book.insertMany(newBooks);
        return res.status(200).json({
            "message": "Inserted successfully!",
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const error = Object.values(err.errors).map(val => val.message);
            next(error);
        } else {
            next(err);
        }
    }
};