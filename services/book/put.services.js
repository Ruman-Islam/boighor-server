const Book = require('../../models/Book');
const { Types: { ObjectId } } = require('mongoose');


// ADD REVIEW TO THE BOOK
exports.addReviewToBook = async (review_body) => {
    try {
        if (!ObjectId.isValid(review_body.id)) {
            return res.status(400).json({
                "statusCode": 400,
                "message": "ID is not valid."
            });
        }

        const review = {
            name: review_body.name,
            review: review_body.review,
            date: review_body.date,
            rating: review_body.rating,
            imgURL: review_body.imgURL
        }

        const result = await Book.updateOne(
            { _id: review_body.id },
            {
                $push: { reviews: review }
            }
        );
        if (result.modifiedCount > 0) {
            return true;
        }
    } catch (err) {
        return false;
    }
};