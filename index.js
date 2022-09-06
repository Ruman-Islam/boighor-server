const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const bookHandler = require('./routes/v1/bookHandler');
const featuredBookHandler = require('./routes/v1/featuredBookHandler');
const newArrivalBookHandler = require('./routes/v1/newArrivalBookHandler');
const databaseConnect = require('./utilities/dbConnect');
const errorHandler = require('./middleware/errorHandler');


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



// DEFAULT ERROR HANDLERS //
app.use(errorHandler);

app.all("*", (req, res) => {
    res.json({
        "message": "No route found"
    });
})

app.listen(port, () => {
    console.log('BOIGHOR server is running on:', port);
})

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    })
});