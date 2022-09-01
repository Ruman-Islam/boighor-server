const express = require('express');
const newArrivalBooksController = require('../../controller/newArrivalBook.controller');
const router = express.Router();


// GET NEW ADDED BOOKS
router.get('/get-all', newArrivalBooksController.newlyAddedBooks);


module.exports = router;