const { Types: { ObjectId } } = require('mongoose');
const Book = require('../../models/Book');


// UPDATE A BOOK
exports.updateABook = async (ID, body, res) => {
    try {
        const { id } = ID;
        const updatedBook = body;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                "statusCode": 400,
                "message": "ID is not valid."
            });
        }
        const book = await Book.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    ...updatedBook
                }
            });
        if (!book) {
            return 0;
        }
        return book;
    } catch (error) {
        return false;
    }
};

// UPDATE/ADD DISCOUNT TO ALL BOOKS
exports.updateDiscountToAll = async (percentage) => {
    try {
        const result = await Book.updateMany(
            {},
            [{
                $set:
                {
                    "sell_price": { $round: { $subtract: ["$sell_price", { $multiply: ["$sell_price", percentage / 100] }] } },
                    "prev_discount": "$current_discount",
                    "current_discount": percentage,
                    "original_price": "$sell_price"
                }
            }],
            { multi: true }
        )
        if (result.modifiedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

// ADD SPECIAL DISCOUNT ON A BOOK
exports.updateSpecialDiscount = async (ID, percentage, res) => {
    try {
        if (!ObjectId.isValid(ID)) {
            return res.status(400).json({
                "statusCode": 400,
                "message": "ID is not valid."
            });
        }
        const result = await Book.updateOne(
            { _id: ID },
            [{
                $set:
                {
                    "sell_price": { $round: { $subtract: ["$sell_price", { $multiply: ["$sell_price", percentage / 100] }] } },
                    "prev_discount": "$current_discount",
                    "current_discount": percentage,
                    "original_price": "$sell_price"
                }
            }],
        );
        if (result.modifiedCount > 0) {
            return true;
        }
    } catch (error) {
        return false;
    }
};

// UPDATE FEATURED BOOK SELL COUNT
exports.updateBookSellCount = async (ID) => {
    try {
        const { id } = ID;
        const result = await Book.updateOne({ _id: id }, { $inc: { sellCount: 1 } });
        if (result.modifiedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

// UPDATE INDIVIDUAL BOOK RATING BY USER
exports.update_book_rating = async (ID, RATING) => {
    try {
        const result = await Book.findOneAndUpdate(
            { _id: ID },
            { $inc: { 'ratings.$[el].count': 1 } },
            {
                arrayFilters: [{ "el.star": +RATING }],
                new: true
            }
        )
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};