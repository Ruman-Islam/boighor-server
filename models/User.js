const mongoose = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const User_Schema = mongoose.Schema({
    role: {
        type: String,
        default: "user"
    },
    user_name: {
        type: String,
        required: [true, "User name is required.400"],
        trim: true,  // trim the whitespace after & before
    },
    email: {
        type: String,
        required: [true, "Email is required.400"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address.400'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.400']
    },
    photoURL: {
        type: String,
        default: "",
    },
    phone: {
        type: Number,
        default: 0000000000
    },
    gender: {
        type: String,
        default: ""
    },
    password: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model("User", User_Schema);

module.exports = User;