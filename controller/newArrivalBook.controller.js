const mongoose = require('mongoose');
const bookSchema = require('../schemas/bookSchema');
const Book = new mongoose.model("Book", bookSchema);


// GET NEW ADDED BOOKS
module.exports.newlyAddedBooks = async (req, res) => {
    const books = await Book.find({}).limit(50).exec();
    const newBooks = books.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json({
        "result": newBooks,
    })
};