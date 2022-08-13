const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bookSchema = require('../schemas/bookSchema');
const Book = new mongoose.model("Book", bookSchema);



// GET NEW ADDED BOOKS
router.get('/get-all', async (req, res) => {
    const books = await Book.find({}).limit(50).exec();
    const newBooks = books.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json({
        result: newBooks,
    })
});



module.exports = router;