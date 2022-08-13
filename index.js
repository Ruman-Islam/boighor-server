const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const bookHandler = require('./routes/bookHandler');
const featuredBookHandler = require('./routes/featuredBookHandler');
const newArrivalBookHandler = require('./routes/newArrivalBookHandler');


// MIDDLEWARE //
app.use(cors());
app.use(express.json());
// ...................... //

// ? Database connection configuration mongoose //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzdnu.mongodb.net/BOIGHOR?retryWrites=true&w=majority`;
(() => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Database connected successfully!')
        }).catch(err => console.log(err))
})();
// ? ...................... //


// APPLICATION ROUTES //
app.use('/book', bookHandler);
app.use('/featured', featuredBookHandler);
app.use('/new-arrival', newArrivalBookHandler);
// ...................//








// DEFAULT ERROR HANDLER //
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);
// .........................

app.listen(port, () => {
    console.log('Server is running on:', port);
})