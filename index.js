require('dotenv').config();
const app = require('./app');


const book_get_routes = require('./routes/v1/book/get.route');
const book_post_routes = require('./routes/v1/book/post.route');
const book_patch_put_routes = require('./routes/v1/book/patch_put.route');
const databaseConnect = require('./utilities/dbConnect');
const errorHandler = require('./middleware/errorHandler');

// ? Database connection //
databaseConnect();


// APPLICATION ROUTES //
app.use('/api/v1/book', book_get_routes, book_post_routes, book_patch_put_routes);
// ...................//



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