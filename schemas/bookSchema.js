const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    publication: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    previousPrice: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    imgURL: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = bookSchema;