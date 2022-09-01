const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const bookHandler = require('./routes/v1/bookHandler');
const featuredBookHandler = require('./routes/v1/featuredBookHandler');
const newArrivalBookHandler = require('./routes/v1/newArrivalBookHandler');
const databaseConnect = require('./utilities/dbConnect');


// APPLICATION MIDDLEWARE //
app.use(cors());
app.use(express.json());
// ...................... //

// ? Database connection //
databaseConnect();


// APPLICATION ROUTES //
app.use('/api/v1/book', bookHandler);
app.use('/api/v1/featured', featuredBookHandler);
app.use('/api/v1/new-arrival', newArrivalBookHandler);
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
    console.log('BOIGHOR server is running on:', port);
})