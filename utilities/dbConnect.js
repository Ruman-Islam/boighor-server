// require("colors");
// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 8080;

// // ? Database connection configuration mongoose //
// const databaseConnect = () => {
//     mongoose
//         .connect(process.env.LOCAL_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         .then(() => {
//             console.log('Database connected successfully!'.white.bold);
//             app.listen(port, () => {
//                 console.log(`BOIGHOR server is running on: ${port}`.yellow.bold);
//             });
//         })
//         .catch(err => console.log('Error message -', err))
// };
// // ? ...................... //

// module.exports = databaseConnect;