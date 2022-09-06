const mongoose = require('mongoose');

// ? Database connection configuration mongoose //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vzdnu.mongodb.net/BOIGHOR?retryWrites=true&w=majority`;
const databaseConnect = () => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Database connected successfully!')
        }).catch(err => console.log('Error message -', err))
};
// ? ...................... //

module.exports = databaseConnect;