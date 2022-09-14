const express = require('express');
const patchController = require('../../../controller/book/patch.controller');
const router = express.Router();


// UPDATE A BOOK
router.patch('/update-one/:id', patchController.updateABook);

// UPDATE/ADD DISCOUNT TO ALL BOOKS
router.patch('/update-discount/:percentage', patchController.updateDiscountToAll);

// UPDATE FEATURED BOOK SELL COUNT
router.patch("/update-sellCount/:id", patchController.updateBookSellCount);

module.exports = router;