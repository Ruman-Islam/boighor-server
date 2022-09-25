const mongoose = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const Cart_Schema = mongoose.Schema({
    user_name: {
        type: String,
        trim: true,  // trim the whitespace after & before
    },
    email: {
        type: String,
        required: [true, "Email is required.400"],
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address.400'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.400']
    },
    products: {
        type: Array,
        default: []
    },
}, { timestamps: true });

const Cart = mongoose.model("Cart", Cart_Schema);

module.exports = Cart;