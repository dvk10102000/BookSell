const express = require('express');
const router =  express.Router();

const detailProductController = require('../app/controllers/DetailProductController');

router.get('/',detailProductController.show);

module.exports = router;

