const Author = require('../../models/author');


// GET AN AUTHOR
exports.getAnAuthor = async (query) => {
    try {
        const author = await Author.findOne({ name: query });
        if (author?.length < 1) {
            return 0;
        }
        return author;
    } catch (error) {
        return false;
    }
};

// GET AN AUTHOR
exports.postAnAuthor = async (body, next, res) => {
    try {
        const newAuthor = new Author(body);
        const result = await newAuthor.save();
        if (result) {
            return true;
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            const error = Object.values(err.errors).map(val => val.message);
            return next(error);
        } {
            return next(err);
        }
    }
};