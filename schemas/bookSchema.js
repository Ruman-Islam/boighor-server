const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    category: { type: String, required: true, },
    date: { type: Date, default: Date.now, },
    description: { type: String, required: true, },
    discount: { type: Number, },
    imgURL: { type: String, required: true, },
    publication: { type: String, required: true, },
    previousPrice: { type: Number, },
    price: { type: Number, required: true, },
    quantity: { type: Number, required: true },
    rating: { type: Number, required: false },
    title: { type: String, required: true, },
    writer: { type: String, required: true, },
});

module.exports = bookSchema;