const Books = require('../model/book');
const users = require('../model/user');
const bills = require('../model/bill');
const CartNotLogin = require('../model/cart');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class HomeController {

    //[GET] /Contact
    homeShowBook(req,res,next){
        let perPage = 10;
        let page = req.query.page    || 1;

        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
        
    }    
}   
        
module.exports = new HomeController;
       

