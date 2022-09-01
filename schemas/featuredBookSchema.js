const mongoose = require('mongoose');

const featuredBookSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    identity: {
        type: mongoose.Types.ObjectId,
        ref: "Book",
    },
    sellCount: {
        type: Number,
        required: true,
    },
});

module.exports = featuredBookSchema;