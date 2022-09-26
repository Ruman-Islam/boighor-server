const express = require('express');
const getController = require('../../../controller/book/get.controller');
const router = express.Router();


// GET ALL BOOKS
router.get('/all', getController.getAllBooks);

// GET NEW ADDED BOOKS
router.get('/new', getController.newlyAddedBooks);

// GET CHILDREN BOOKS
router.get('/children', getController.getChildrenBooks);

// BOOK SEARCH IMPLEMENTATION
router.get('/search', getController.getSearchedBooks);

// GET PUBLICATION DROPDOWN LIST
router.get('/publications', getController.getPublication);

// GET CATEGORY LIST
router.get('/categories', getController.getCategories);

// GET WRITER DROPDOWN LIST
router.get('/writers', getController.getWriter);

// GET FEATURED BOOKS
router.get('/featured', getController.getFeaturedBooks);

// GET BESTSELLING BOOK
router.get('/bestselling', getController.getBestSellingBook);

// GET A BOOK
router.get('/get-one/:id', getController.getABook);

// GET SPECIAL OFFER
router.get('/special-offer', getController.getSpecialOfferedBook);

// GET BOOKS CATEGORY WISE
router.get('/category', getController.getBooksCategoryWise);


module.exports = router;