const express = require('express');
const route = express.Router();

const AdminController = require('../app/controllers/AdminController');


route.get('/managerItems',AdminController.managerItems);
route.post('/update/:id',AdminController.updateItem);
route.get('/update/:id',AdminController.update);
route.delete('/distroy/:id',AdminController.distroy);
route.get('/detailBill/:id',AdminController.detailBill);
route.get('/confirmOrder/:id',AdminController.confirmOrder);

module.exports = route;
