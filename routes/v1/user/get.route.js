const express = require('express');
const getController = require('../../../controller/user/get.controller');
const router = express.Router();

// GET INDIVIDUAL CUSTOMER/USER ALL DATA
router
    .route("/user-info")
    .get(getController.getIndividualUserInfo)



module.exports = router;