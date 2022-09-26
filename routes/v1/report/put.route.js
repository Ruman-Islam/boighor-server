const express = require('express');
const putController = require('../../../controller/report/put.controller');
const router = express.Router();


router
    .route('/post_a_report')
    .put(putController.postAReport)


module.exports = router;