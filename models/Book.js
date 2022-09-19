const mongoose = require('mongoose');

const Book_Schema = mongoose.Schema({
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Vendor ID is required.400"],
        ref: "Vendor",
    },
    imgURL: {
        type: String,
        required: [true, "Image URL is required.400"],
    },
    title: {
        type: String,
        required: [true, "Title is required.400"],
        trim: true,  // trim the whitespace after & before
    },
    author: {
        type: String,
        required: [true, "Author name is required.400"],
    },
    publisher: {
        type: String,
        required: [true, "Publisher is required.400"],
    },
    category: {
        type: String,
        required: [true, "Category is required.400"],
        trim: true,
        minLength: [2, "Category is too short.400"],
        maxLength: [20, "Category is too large.400"],
    },
    country: {
        type: String,
        required: [true, "Country is required.400"],
    },
    language: {
        type: String,
        required: [true, "Language is required.400"],
    },
    edition: {
        type: String,
        required: [true, "Edition is required.400"],
    },
    copy_version: {
        type: String,
        required: [true, "Version is required.400"],
    },
    ISBN: {
        type: Number,
        required: [true, "ISBN number is required.400"],
    },
    original_price: {
        type: Number,
        min: [0, "Original price can't be negative.400"],
        default: 0
    },
    sell_price: {
        type: Number,
        required: [true, "Sell price is required.400"],
        min: [0, "Sell price can't be negative.400"],
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
    page_length: {
        type: Number,
        required: [true, "Number of page is required.400"],
    },
    prev_discount: {
        type: Number,
        default: 0,
    },
    current_discount: {
        type: Number,
        default: 0,
    },
    sell_count: {
        type: Number,
        default: 0,
    },
    ratings: {
        type: Array,
        default: [
            { star: 1, count: 0 },
            { star: 2, count: 0 },
            { star: 3, count: 0 },
            { star: 4, count: 0 },
            { star: 5, count: 0 },
        ]
    },
    offers: {
        type: Array,
        default: []
    },
    reviews: {
        type: Array,
        default: []
    },
    summary: {
        type: String,
    },
    // status: {
    //     type: String,
    //     required: true,
    // enum: {
    //   values: ["in stock", "out of stock", "discontinued"],
    //   message: "status can't be {VALUE}",
    // },
    // },
    upload_date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Book = mongoose.model("Book", Book_Schema);

module.exports = Book;