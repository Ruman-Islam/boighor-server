const express = require('express');
const patchPutController = require('../../../controller/bookControllers/patch_put.controller');
const router = express.Router();


// UPDATE A BOOK
router.patch('/update-one/:id', patchPutController.updateABook);

// UPDATE/ADD DISCOUNT TO ALL BOOKS
router.patch('/add-discount/:percentage', patchPutController.updateDiscount);

// ADD SPECIAL DISCOUNT ON A BOOK
router.put('/add-special-discount', patchPutController.addSpecialDiscount);

// UPDATE FEATURED BOOK SELL COUNT
router.patch("/update/:id", patchPutController.updateBookSellCount);

module.exports = router;