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
            console.log('first')
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
                    "price": { $round: { $subtract: ["$price", { $multiply: ["$price", percentage / 100] }] } },
                    "previousPrice": "$price",
                    "discount": percentage
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