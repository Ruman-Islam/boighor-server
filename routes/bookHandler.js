const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bookSchema = require('../schemas/bookSchema');
const book = new mongoose.model("Book", bookSchema);



// Post a book
router.post('/add-book', async (req, res, next) => {
    try {
        const newBook = new book(req.body);
        await newBook.save();
        res.status(200).json({
            message: "Book was inserted successfully!",
        })
    } catch (err) {
        next("There was a server side error!");
    }
});

module.exports = router;