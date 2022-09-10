const mongoose = require('mongoose');

const book_schema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required.400"],
        trim: true,  // trim the whitespace after & before
    },
    category: {
        type: String,
        required: [true, "Category is required.400"],
        trim: true,
        minLength: [2, "Category is too short.400"],
        maxLength: [20, "Category is too large.400"],
    },
    price: {
        type: Number,
        required: [true, "Price is required.400"],
        min: [0, "Price can't be negative.400"],
    },
    previousPrice: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required.400"],
        min: [0, "Quantity can't be negative.400"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            },
            message: "Quantity must be an integer.400",
        },
    },
    imgURL: {
        type: String,
        required: [true, "Image is required.400"],
    },
    publication: {
        type: String,
        required: [true, "Publication name is required.400"],
    },
    writer: {
        type: String,
        required: [true, "Writer name is required.400"],
    },
    description: {
        type: String,
        required: [true, "Description is required.400"],
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
    },
    // status: {
    //     type: String,
    //     required: true,
    //     enum: {
    //       values: ["in stock", "out of stock", "discontinued"],
    //       message: "status can't be {VALUE}",
    //     },
    // },
    discount: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        max: [5, "Rating can't be more than 5.400"],
        default: 0,
    },
    sellCount: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = book_schema;