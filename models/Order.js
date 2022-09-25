const mongoose = require('mongoose');


const Order_Schema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, "Username is required.400"]
    },
    email: {
        type: String,
        required: [true, "Email is required.400"],
    },
    phone: {
        type: String,
        required: [true, "Number is required.400"],
    },
    orders: {
        type: Array,
        required: [true, "Product Id is missing.400"],
    },
    transaction_id: {
        type: String
    }

}, { timestamps: true });

const Order = mongoose.model("Order", Order_Schema);

module.exports = Order;