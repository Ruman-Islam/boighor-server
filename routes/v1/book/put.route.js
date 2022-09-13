const express = require('express');
const putController = require('../../../controller/book/put.controller');
const router = express.Router();

// ADD SPECIAL DISCOUNT ON A BOOK
router.put('/add-special-discount', putController.updateSpecialDiscount);

module.exports = router;