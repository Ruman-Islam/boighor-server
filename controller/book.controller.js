const mongoose = require('mongoose');
const bookSchema = require('../schemas/bookSchema');
const Book = new mongoose.model("Book", bookSchema);

// GET ALL BOOKS
module.exports.getAllBooks = async (req, res, next) => {
    try {
        const result = await Book.find({});
        res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// GET CHILDREN BOOKS
module.exports.getChildrenBooks = async (req, res, next) => {
    try {
        const result = await Book.find({ category: 'children' });
        res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// BOOK SEARCH IMPLEMENTATION
module.exports.getSearchedBooks = async (req, res) => {
    const { char } = req.query;
    const books = await Book.find({
        title: {
            $regex: char.toLowerCase(),
            $options: "i"
        }
    });
    res.status(200).json({
        "result": books,
    })
};

// GET PUBLICATION DROPDOWN LIST
module.exports.getPublicationNames = async (req, res, next) => {
    try {
        const publications = await Book.aggregate([
            { "$group": { "_id": "$publication" } },
        ])

        res.status(200).json({
            "result": publications,
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// GET WRITER DROPDOWN LIST
module.exports.getWriterNames = async (req, res, next) => {
    try {
        const writers = await Book.aggregate([
            { "$group": { "_id": "$writer" } },
        ])

        res.status(200).json({
            "result": writers,
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// GET A BOOK
module.exports.getABook = async (req, res, next) => {
    const { id } = req.query;
    try {
        const result = await Book.findOne({ _id: id });
        res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// ADD A BOOK
module.exports.addABook = async (req, res, next) => {
    const newBook = new Book(req.body);
    try {
        await newBook.save();
        res.status(200).json({
            "message": "Book was inserted successfully!",
        })
    } catch (err) {
        next("There was a server side errors!");
    }
};

// ADD MANY BOOKS
module.exports.addManyBooks = async (req, res, next) => {
    try {
        await Book.insertMany(req.body);
        res.status(200).json({
            "message": "Books were inserted successfully!",
        })
    } catch (err) {
        next("There was a server side errors!");
    }
};

// UPDATE A BOOK
module.exports.updateABook = async (req, res, next) => {
    try {
        await Book.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    rating: 5
                }
            }, { upsert: true });
        res.status(200).json({
            "message": "Book was updated successfully!",
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// UPDATE/ADD DISCOUNT TO ALL BOOKS
module.exports.update_add_discount = async (req, res, next) => {
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
            "message": "Success"
        });
    } catch (err) {
        next("There was a server side error!");
    }
};

// ADD SPECIAL DISCOUNT ON A BOOK
module.exports.add_special_discount = async (req, res, next) => {
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