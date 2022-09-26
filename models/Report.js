const mongoose = require('mongoose');


const Report_Schema = mongoose.Schema({
    user_email: {
        type: String,
        required: [true, "Email is required.400"]
    },
    user_name: {
        type: String,
    },
    message: {
        type: String,
        required: [true, "Message is empty.400"]
    }

}, { timestamps: true });

const Report = mongoose.model("Report", Report_Schema);

module.exports = Report;