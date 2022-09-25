const express = require('express');
const postController = require('../../../controller/book/post.controller');
const router = express.Router();


// ADD A BOOK
router.post('/add-one', postController.addABook);

// ADD MANY BOOKS
router.post('/add-many', postController.addManyBooks);


// GET USER'S CART ITEMS
router
    .route('/get_cart_item')
    .post(postController.getUserCartItems)

module.exports = router;