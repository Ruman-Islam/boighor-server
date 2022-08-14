const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bookSchema = require('../schemas/bookSchema');
const Book = new mongoose.model("Book", bookSchema);



// GET ALL BOOKS
router.get('/get-all', async (req, res, next) => {
    try {
        const result = await Book.find({});
        res.status(200).json({
            result: result,
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// ADD A BOOK
router.post('/add-one', async (req, res, next) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(200).json({
            message: "Book was inserted successfully!",
        })
    } catch (err) {
        next("There was a server side errors!");
    }
});


// ADD MANY BOOKS
router.post('/add-many', async (req, res, next) => {
    try {
        await Book.insertMany(req.body);
        res.status(200).json({
            message: "Books were inserted successfully!",
        })
    } catch (err) {
        console.log(err);
        next("There was a server side errors!");
    }
});


// UPDATE A BOOK
router.put('/update-one/:id', async (req, res, next) => {

    try {
        await Book.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    imgURL: req.body.imgURL
                }
            }, { new: true, useFindAndModify: false, })
        res.status(200).json({
            message: "Book was updated successfully!",
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// UPDATE/ADD DISCOUNT TO ALL BOOKS
router.put("/add-discount/:percentage", async (req, res, next) => {
    const percentage = +req.params.percentage;
    try {
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
            message: "Success"
        });
    } catch (err) {
        console.log(err);
        next("There was a server side error!");
    }
});


module.exports = router;