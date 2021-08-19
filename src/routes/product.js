const express = require('express');
const router =  express.Router();

const ProductController = require('../app/controllers/ProductController');

router.get('/detailBook/:id',ProductController.show);
// router.post('/searchBook',ProductController.searchBook);
// router.get('/searchBook',ProductController.searchBook);

module.exports = router;

