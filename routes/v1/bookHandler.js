const express = require('express');
const bookController = require('../../controller/book.controller');
const router = express.Router();


// GET ALL BOOKS
router.get('/get-all', bookController.getAllBooks);

// GET CHILDREN BOOKS
router.get('/get-children', bookController.getChildrenBooks);

// BOOK SEARCH IMPLEMENTATION
router.get('/search-book', bookController.getSearchedBooks);

// GET PUBLICATION DROPDOWN LIST
router.get('/get-publications', bookController.getPublicationNames);

// GET WRITER DROPDOWN LIST
router.get('/get-writers', bookController.getWriterNames);

// GET A BOOK
router.get('/get-one', bookController.getABook);

// ADD A BOOK
router.post('/add-one', bookController.addABook);

// ADD MANY BOOKS
router.post('/add-many', bookController.addManyBooks);

// UPDATE A BOOK
router.put('/update-one/:id', bookController.updateABook);

// UPDATE/ADD DISCOUNT TO ALL BOOKS
router.put('/add-discount/:percentage', bookController.update_add_discount);

// ADD SPECIAL DISCOUNT ON A BOOK
router.put('/add-special-discount', bookController.add_special_discount);


module.exports = router;