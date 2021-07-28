const Books = require('../model/book');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class HomeController {

    //[GET] /Contact
    homeShowBook(req,res,next){
        Books.find({})
             .then(book =>{
                 res.render('home', {book : mutipleMongooseToObject(book)})
                
             })
             .catch(next);
    }

}


module.exports = new HomeController;