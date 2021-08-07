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
    async searchBook(req, res,next){
        
       books.find({name : req.body.nameBook})
                    .then( book => {
                        res.render('search',{
                            book : mutipleMongooseToObject(book),
                        })
                    })
       
                  
        
        
    }
}

module.exports =  new ProductController;
