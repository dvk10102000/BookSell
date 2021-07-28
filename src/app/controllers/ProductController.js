const books = require('../model/book');
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
}

module.exports =  new ProductController;