const express = require('express');
const putController = require('../../../controller/order/put.controller');
const router = express.Router();

router
    .route('/put_order')
    .put(putController.putAnOrder)

router
    .route('/cancel_order')
    .put(putController.cancelOrder)
router
    .route('/update_order_transaction')
    .put(putController.updateTransaction)

module.exports = router;