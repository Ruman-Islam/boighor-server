const express = require('express');
const getController = require('../../../controller/author/get.controller');
const router = express.Router();



// POST AN AUTHOR
router.post('/', getController.getAnAuthor);


module.exports = router;