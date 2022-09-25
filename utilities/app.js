const express = require('express');
const cors = require('cors');
const app = express();


// IMPORTING APPLICATION ROUTES
const book_get_routes = require('../routes/v1/book/get.route');
const book_post_routes = require('../routes/v1/book/post.route');
const book_patch_routes = require('../routes/v1/book/patch.route');
const book_put_routes = require('../routes/v1/book/put.route');

const author_get_routes = require('../routes/v1/author/get.route');

const user_put_routes = require('../routes/v1/user/put.route');
const user_get_routes = require('../routes/v1/user/get.route');

const cart_put_routes = require('../routes/v1/Cart/put.route');

const order_put_routes = require('../routes/v1/order/put.route');
const order_get_routes = require('../routes/v1/order/get.route');

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

app.use('/api/v1/author',
    author_get_routes,
);

app.use('/api/v1/user',
    user_get_routes,
    user_put_routes,
);

app.use('/api/v1/cart',
    cart_put_routes,
);

app.use('/api/v1/order',
    order_put_routes,
    order_get_routes,
);
// ...................//

module.exports = app;