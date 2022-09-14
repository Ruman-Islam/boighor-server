const Book = require('../../models/Book');
const { Types: { ObjectId } } = require('mongoose');


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
                    "price": { $round: { $subtract: ["$price", { $multiply: ["$price", percentage / 100] }] } },
                    "previousPrice": "$price",
                    "discount": percentage
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