const express = require('express');
const getController = require('../../../controller/author/get.controller');
const router = express.Router();


// GET AN AUTHOR
router
    .route("/")
    .get(getController.getAnAuthor)
    .post(getController.postAnAuthor)


module.exports = router;