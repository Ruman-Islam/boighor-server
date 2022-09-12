const express = require('express');
const postController = require('../../../controller/bookControllers/post.controller');
const router = express.Router();


// ADD A BOOK
router.post('/add-one', postController.addABook);

// ADD MANY BOOKS
router.post('/add-many', postController.addManyBooks);

module.exports = router;