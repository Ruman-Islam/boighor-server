require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// APPLICATION MIDDLEWARE //
// app.use(cors());
app.use(express.json());
// ...................... //

app.get("/", (req, res) => {
    res.send("Route is working!");
});


app.listen(port, () => {
    console.log(`BOIGHOR server is running on: ${port}`);
});