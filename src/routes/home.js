const express = require('express');
const route = express.Router();

const homeController = require('../app/controllers/HomeController');


route.get('/sortPopular',homeController.sortPopular);
route.get('/searchBook',homeController.searchBook);
route.post('/searchBook',homeController.searchBook);
route.get('/:page?',homeController.homeShowBook);

module.exports = route;
