const Book = require('../../models/Book');
const { Types: { ObjectId } } = require('mongoose');


// GET ALL BOOKS
exports.getAllBooks = async () => {
    try {
        const books = await Book?.find({});
        if (books?.length <= 0) {
            return 0;
        }
        return books;
    } catch (error) {
        return false;
    }
};

// GET NEW ADDED BOOKS
exports.newlyAddedBooks = async () => {
    try {
        const newBooks = await Book?.find({}).limit(50).exec();
        if (newBooks?.length <= 0) {
            return 0;
        }
        newBooks.sort((a, b) => new Date(b?.date) - new Date(a?.date));
        return newBooks;
    } catch (error) {
        return false;
    }
};

// GET CHILDREN BOOKS
exports.getChildrenBooks = async () => {
    try {
        const childrenBooks = await Book?.find({ category: 'children' });
        if (childrenBooks?.length <= 0) {
            return 0;
        }
        return childrenBooks;
    } catch (error) {
        return false;
    }
};

// BOOK SEARCH IMPLEMENTATION
exports.getSearchedBooks = async (query) => {
    try {
        const { char } = query;
        const searchedBooks = await Book.find({
            title: {
                $regex: char.toLowerCase(),
                $options: "i"
            }
        });
        if (searchedBooks?.length <= 0) {
            return 0;
        }
        return searchedBooks;
    } catch (error) {
        return false;
    }
};

// GET PUBLICATION DROPDOWN LIST
exports.getPublication = async () => {
    try {
        const publications = await Book.aggregate([
            // { $group: { _id: "$publication", count: { $count: {} } } },
            { $group: { _id: "$publication" } },
            { $sort: { _id: 1 } },
        ]);
        if (publications?.length <= 0) {
            return 0;
        }
        return publications;
    } catch (error) {
        return false;
    }
};

// GET WRITER DROPDOWN LIST
exports.getWriter = async () => {
    try {
        const writers = await Book.aggregate([
            // { $group: { _id: "$publication", count: { $count: {} } } },
            { $group: { _id: "$writer" } },
            { $sort: { _id: 1 } },
        ]);
        if (writers?.length <= 0) {
            return 0;
        }
        return writers;
    } catch (error) {
        return false;
    }
};

// GET FEATURED BOOKS
exports.getFeaturedBooks = async () => {
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
        if (result?.length <= 0) {
            return 0;
        }
        return result;
    } catch (error) {
        return false;
    }
};

// GET BESTSELLING BOOK
exports.getBestSellingBook = async () => {
    try {
        const bestselling = await Book.aggregate([
            { $sort: { sellCount: -1 } },
            {
                $project: {
                    title: 1, publication: 1, imgURL: 1,
                    price: 1, discount: 1, previousPrice: 1
                }
            }
        ]).limit(1);
        if (bestselling?.length <= 0) {
            return 0;
        }
        return bestselling;
    } catch (error) {
        return false;
    }
};

// GET A BOOK
exports.getABook = async (ID, res) => {
    try {
        const { id } = ID;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                "statusCode": 400,
                "message": "ID is not valid."
            });
        }
        const book = await Book.findOne({ _id: id });
        if (!book) {
            return 0;
        }
        return book;
    } catch (error) {
        return false;
    }
};

// GET SPECIAL OFFER
exports.getSpecialOfferedBook = async () => {
    try {
        const specialOfferedBook = await Book.aggregate([
            { $match: { discount: { $gte: 25 } } }
        ]).limit(1);
        if (specialOfferedBook?.length <= 0) {
            return 0;
        }
        return specialOfferedBook;
    } catch (error) {
        return false;
    }
};