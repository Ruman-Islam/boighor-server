const Book = require('../../models/Book');



// ADD A BOOK
exports.addABook = async (body, next) => {
    try {
        const book = new Book(body);
        const result = await book.save();
        if (result) {
            return true;
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            const error = Object.values(err.errors).map(val => val.message);
            return next(error);
        } {
            return next(err);
        }
    }
};

// ADD MANY BOOKS
exports.addManyBooks = async (body, next, res) => {
    try {
        const result = await Book.insertMany(body);
        if (result) {
            return true;
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            const error = Object.values(err.errors).map(val => val.message);
            const errArr = error[0].split(".");
            return res.status(+errArr[1]).json({
                "statusCode": errArr[1],
                "message": errArr[0]
            });
        } {
            return next(err);
        }
    }
};