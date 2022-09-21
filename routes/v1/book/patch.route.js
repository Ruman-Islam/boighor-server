const express = require('express');
const patchController = require('../../../controller/book/patch.controller');
const router = express.Router();


// UPDATE A BOOK
router
    .route('/update-one/:id')
    .patch(patchController.updateABook)

// UPDATE/ADD DISCOUNT TO ALL BOOKS
router
    .route('/update-discount/:percentage')
    .patch(patchController.updateDiscountToAll)

// ADD SPECIAL DISCOUNT ON A BOOK
router
    .route('/add-special-discount')
    .patch(patchController.updateSpecialDiscount)

// UPDATE FEATURED BOOK SELL COUNT
router
    .route('/update-sellCount/:id')
    .patch(patchController.updateBookSellCount)

// UPDATE INDIVIDUAL BOOK RATING BY USER
router
    .route('/update_book_rating')
    .patch(patchController.update_book_rating)


module.exports = router;