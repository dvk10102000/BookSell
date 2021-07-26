const express = require('express');
const router =  express.Router();

const acountController = require('../app/controllers/AcountController');

router.get('/',acountController.show);

module.exports = router;

