const Books = require('../model/book');
const users = require('../model/user');
const bills = require('../model/bill');
const CartNotLogin = require('../model/cart');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class HomeController {

    //[GET] /Contact
    detailBill(req,res,next){
        bills.findOne({_id : req.params.id})
             .then(bill =>{
                res.render('detailBill',{bill: mongooseToObject(bill)})
             })
        
    }  
    async confirmOrder(req, res,next){
       let bill = await bills.findOne({_id : req.params.id});
       bill.status = true;
       bills.updateOne({_id : req.params.id},bill)
            .then(bill =>{
                res.redirect('/');
            })
    }  
}   
        
module.exports = new HomeController;
       

