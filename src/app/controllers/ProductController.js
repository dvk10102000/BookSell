const books = require('../model/book');
const users = require('../model/user');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class ProductController{

    //[GET] product/detailProduct
    show(req, res,next){
        books.findOne({_id : req.params.id})
             .then( book => {
                 res.render('detailProduct',mongooseToObject(book));
                 
             })
             .catch(next);
        
    }
    // async searchBook(req, res,next){
    //     let Name;
    //    if(req.body.nameBook == '' || req.body.nameBook == null || req.body.nameBook == 'undified'){
    //        console.log(123);
    //        Name = req.session.nameBookLocal;
    //    } else{
    //        req.session.nameBookLocal = req.body.nameBook;
    //        Name = req.body.nameBook;
    //    }
    //    books.find({name : Name})
    //                 .then( book => {
    //                     res.render('search',{
    //                         book : mutipleMongooseToObject(book),
    //                     })
    //                 })
       
                  
        
        
    // }
}

module.exports =  new ProductController;
