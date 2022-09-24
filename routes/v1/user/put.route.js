const express = require('express');
const putController = require('../../../controller/user/put.controller');
const router = express.Router();

// LOG IN WITH SOCIAL AND GENERATE TOKEN
router
    .route("/social_login")
    .put(putController.createUserAndGenerateToken)



module.exports = router;