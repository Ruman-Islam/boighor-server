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


// GET CHILDREN BOOKS
router.get('/get-children', async (req, res, next) => {
    try {
        const result = await Book.find({ category: 'children' });
        res.status(200).json({
            result: result,
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// GET PUBLICATION DROPDOWN LIST
router.get('/get-publications', async (req, res, next) => {
    const publications = [];
    try {
        const result = await Book.find({}, 'publication');
        for (const pb of result) {
            if (publications.indexOf(pb.publication) === -1) {
                publications.push(pb.publication);
            }
        }
        res.status(200).json({
            result: publications.sort(),
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


// GET WRITER DROPDOWN LIST
router.get('/get-writers', async (req, res, next) => {
    const writers = [];
    try {
        const result = await Book.find({}, 'writer');
        for (const pb of result) {
            console.log(pb);
            if (writers.indexOf(pb.writer) === -1) {
                writers.push(pb.writer);
            }
        }
        res.status(200).json({
            result: writers.sort(),
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
            }, { new: true, useFindAndModify: false, });
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


// ADD SPECIAL DISCOUNT ON A BOOK
router.put("/add-special-discount", async (req, res, next) => {
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
            message: "Success"
        });
    } catch (err) {
        next("There was a server side error!");
    }
});


module.exports = router;