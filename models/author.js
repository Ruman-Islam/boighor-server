const mongoose = require('mongoose');

const Author_Schema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Author is already exists.400"],
        required: [true, "Author is required.400"],
        trim: true,  // trim the whitespace after & before
    },
    author_des: {
        type: String,
        required: [true, "Description is required.400"],
    },
    imgURL: {
        type: String,
        required: [true, "Image URL is required.400"],
    },
}, { timestamps: true });

const Author = mongoose.model("Author", Author_Schema);

module.exports = Author;