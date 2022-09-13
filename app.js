const express = require('express');
const cors = require('cors');
const app = express();

// IMPORTING APPLICATION ROUTES
const book_get_routes = require('./routes/v1/book/get.route');
const book_post_routes = require('./routes/v1/book/post.route');
const book_patch_routes = require('./routes/v1/book/patch.route');
const book_put_routes = require('./routes/v1/book/put.route');

// APPLICATION MIDDLEWARE //
app.use(cors());
app.use(express.json());
// ...................... //

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
// ...................//


module.exports = app;