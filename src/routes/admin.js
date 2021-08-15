const express = require('express');
const route = express.Router();

const AdminController = require('../app/controllers/AdminController');


route.get('/detailBill/:id',AdminController.detailBill);
route.get('/confirmOrder/:id',AdminController.confirmOrder);

module.exports = route;
