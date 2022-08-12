const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware //
app.use(cors());
app.use(express.json());
// ...................... //

// ? Database connection configuration
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzdnu.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true },
    () => console.log('connected to db!'))
// ? ...................... //












app.listen(port, () => {
    console.log('Server is running on:', port);
})

console.log(__dirname)
console.log(__filename)