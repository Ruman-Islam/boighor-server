const express = require('express');
const putController = require('../../../controller/book/put.controller');
const router = express.Router();

// ADD REVIEW TO THE BOOK
router
    .route('/add_review_to_review')
    .put(putController.addReviewToBook)

module.exports = router;