require('dotenv').config();
const app = require('./app');

const book_routes = require('./routes/v1/book.route');
const featured_routes = require('./routes/v1/featured.route');
const new_added_routes = require('./routes/v1/newArrivalBookHandler');
const databaseConnect = require('./utilities/dbConnect');
const errorHandler = require('./middleware/errorHandler');

// ? Database connection //
databaseConnect();


// APPLICATION ROUTES //
app.use('/api/v1/book', book_routes);
app.use('/api/v1/featured', featured_routes);
app.use('/api/v1/new-arrival', new_added_routes);
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