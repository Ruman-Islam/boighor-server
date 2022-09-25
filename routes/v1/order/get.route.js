const express = require('express');
const getController = require('../../../controller/order/get.controller');
const router = express.Router();

router
    .route('/get_user_order')
    .get(getController.getAllOrdersOfAUser)

module.exports = router;