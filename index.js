require("colors");
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

// IMPORTING APPLICATION ROUTES
const book_get_routes = require('./routes/v1/book/get.route');
const book_post_routes = require('./routes/v1/book/post.route');
const book_patch_routes = require('./routes/v1/book/patch.route');
const book_put_routes = require('./routes/v1/book/put.route');

const author_get_routes = require('./routes/v1/author/get.route');

// APPLICATION MIDDLEWARE //
app.use(cors());
app.use(express.json());
// ...................... //

// UTILS
// const databaseConnect = require('./utilities/dbConnect');
const errorHandler = require('./middleware/errorHandler');

// DATABASE CONNECTION //
// databaseConnect();

app.get("/", (req, res) => {
    res.send("Route is working!");
});

// APPLICATION ROUTES //
app.use('/api/v1/book',
    book_get_routes,
    book_post_routes,
    book_patch_routes,
    book_put_routes,
);
app.use('/api/v1/author',
    author_get_routes,
);
// ...................//

app.listen(port, () => {
    console.log(`BOIGHOR server is running on: ${port}`.yellow.bold);
});

// DEFAULT ERROR HANDLERS //
app.use(errorHandler);

app.all("*", (req, res) => {
    res.json({
        "message": "No route found"
    });
})

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    })
});