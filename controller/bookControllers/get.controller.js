const { Types: { ObjectId }, model } = require('mongoose');
const book_schema = require('../../schemas/bookSchema');
const Book = new model("Book", book_schema);



// GET ALL BOOKS
module.exports.getAllBooks = async (req, res, next) => {
    try {
        const result = await Book.find({});
        if (result?.length <= 0) {
            return res.status(404).json({
                "error": 404,
                "message": "No data found."
            });
        }
        return res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next(err);
    }
};


// GET NEW ADDED BOOKS
module.exports.newlyAddedBooks = async (req, res) => {
    const books = await Book.find({}).limit(50).exec();
    const newBooks = books.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json({
        "result": newBooks,
    })
};


// GET CHILDREN BOOKS
module.exports.getChildrenBooks = async (req, res, next) => {
    try {
        const result = await Book.find({ category: 'children' });
        if (result?.length <= 0) {
            return res.status(404).json({
                "error": 404,
                "message": "No data found."
            });
        }
        return res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next(err);
    }
};


// BOOK SEARCH IMPLEMENTATION
module.exports.getSearchedBooks = async (req, res, next) => {
    try {
        const { char } = req.query;
        const books = await Book.find({
            title: {
                $regex: char.toLowerCase(),
                $options: "i"
            }
        });
        if (books.length <= 0) {
            return res.status(404).json({
                "error": 404,
                "message": "No data found."
            });
        }
        return res.status(200).json({
            "result": books,
        });
    } catch (error) {
        next(err);
    }
};


// GET PUBLICATION DROPDOWN LIST
module.exports.getPublication = async (req, res, next) => {
    try {
        const publications = await Book.aggregate([
            // { $group: { _id: "$publication", count: { $count: {} } } },
            { $group: { _id: "$publication" } },
            { $sort: { _id: 1 } },
        ]);

        if (publications?.length <= 0) {
            return res.status(404).json({
                "error": 404,
                "message": "No data found."
            });
        }
        return res.status(200).json({
            "result": publications,
        });
    } catch (err) {
        next(err);
    }
};


// GET WRITER DROPDOWN LIST
module.exports.getWriter = async (req, res, next) => {
    try {
        const writers = await Book.aggregate([
            // { $group: { _id: "$writer", count: { $count: {} } } },
            { $group: { _id: "$writer" } },
            { $sort: { _id: 1 } },
        ]);

        if (writers?.length <= 0) {
            return res.status(404).json({
                "error": 404,
                "message": "No data found."
            });
        }
        return res.status(200).json({
            "result": writers,
        });
    } catch (err) {
        next(err);
    }
};


// GET FEATURED BOOKS
module.exports.getFeaturedBooks = async (req, res, next) => {
    try {
        const result = await Book.aggregate([
            { $sort: { sellCount: -1 } },
            {
                $project: {
                    title: 1, publication: 1, imgURL: 1,
                    price: 1, discount: 1, previousPrice: 1
                }
            }
        ]);
        res.status(200).json({
            "result": result
        });
    } catch (err) {
        next("There was a server side error!");
    }
};


// GET BESTSELLING BOOK
module.exports.getBestSoldOutBook = async (req, res, next) => {
    try {
        const result = await Book.aggregate([
            { $sort: { sellCount: -1 } },
            {
                $project: {
                    title: 1, publication: 1, imgURL: 1,
                    price: 1, discount: 1, previousPrice: 1
                }
            }
        ]).limit(1);
        res.status(200).json({
            "result": result[0],
        });
    } catch (err) {
        next("There was a server side error!");
    }
};


// GET A BOOK
module.exports.getABook = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                "error": 400,
                "message": "ID is not valid."
            });
        }
        const result = await Book.findOne({ _id: id });
        return res.status(200).json({
            "result": result,
        });
    } catch (err) {
        next(err);
    }
};


// GET SPECIAL OFFER
module.exports.getSpecialOfferedBook = async (req, res, next) => {
    try {
        const specialOfferedBook = await Book.aggregate([
            { $match: { discount: { $gte: 25 } } }
        ]).limit(1);
        res.send(specialOfferedBook);
    } catch (error) {

    }
};