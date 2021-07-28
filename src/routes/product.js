const express = require('express');
const router =  express.Router();

const ProductController = require('../app/controllers/ProductController');

router.get('/detailBook/:id',ProductController.show);

module.exports = router;

