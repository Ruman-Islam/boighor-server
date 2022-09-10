const express = require('express');
const featuredBookController = require('../../controller/featuredBook.controller');
const router = express.Router();


// GET FEATURED BOOKS
router.get('/get-all', featuredBookController.getFeaturedBooks);

// GET BESTSELLING BOOK
router.get('/bestselling', featuredBookController.getBestSoldOutBook);

// UPDATE FEATURED BOOK SELL COUNT
router.put("/update/:id", featuredBookController.updateBookSellCount);

module.exports = router;