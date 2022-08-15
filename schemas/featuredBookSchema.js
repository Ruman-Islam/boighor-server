const mongoose = require('mongoose');

const featuredBookSchema = mongoose.Schema({
    sellCount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    identity: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }
});

module.exports = featuredBookSchema;