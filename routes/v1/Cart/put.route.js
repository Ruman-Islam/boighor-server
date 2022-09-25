const express = require('express');
const getController = require('../../../controller/cart/put.controller');
const router = express.Router();


router
    .route('/save_to_cart')
    .put(getController.saveToCart)

module.exports = router;