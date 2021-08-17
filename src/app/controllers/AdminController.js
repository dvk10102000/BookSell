const Books = require('../model/book');
const users = require('../model/user');
const bills = require('../model/bill');
const CartNotLogin = require('../model/cart');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/img');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname);
    }
});  

let upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype== "image/jpg" || file.mimetype== "image/jpeg"){
            cb(null, true);
        }else{
            return cb(new Error('Only image are allowed!'));
        }
    }
}).single("image");


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
    managerItems(req, res, next){
       Books.find({})
            .then(books =>{
                res.render('managerItems',{
                  book: mutipleMongooseToObject(books),
                })
            })
    }

    distroy(req, res, next){
        Books.deleteOne({_id: req.params.id})
             .then(() =>{
                 res.redirect('back');
             })
    }
    update(req, res, next){
        Books.findOne({_id: req.params.id})
             .then(book => {
                 res.render('updateItems',mongooseToObject(book))
             })
    }
    async updateItem(req, res, next){
       
       
        let book = await Books.findOne({_id: req.params.id});
                      
        await upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log("A Multer error occurred when uploading."); 
            } else if (err) {
              console.log("An unknown error occurred when uploading." + err);
            }else{
                book.name = req.body.name;
                book.priceCurrent = req.body.priceCurrent;
                book.quantity = req.body.quantity;  
                book.image = req.file.filename;
                Books.updateOne({_id : req.params.id},book)
                     .then(() => {
                        res.redirect('/admin/managerItems');
                     })
                
            }
        })  

            
                        
                     
                        
                
    }
    async AddItems(req, res, next) {
        // await upload(req, res, function (err) {
        //     if (err instanceof multer.MulterError) {
        //       console.log("A Multer error occurred when uploading."); 
        //     } else if (err) {
        //       console.log("An unknown error occurred when uploading." + err);
        //     }else{
        //         let book = new Book({
        //             name : req.body.name,
        //             description : req.body.description,
        //             nameAuthor : req.body.nameAuthor,
        //             publicLocation : req.body.publicLocation,
        //             image : req.file.filename,
        //             priceOld : req.body.priceOld,
        //             priceCurrent : req.body.priceCurrent,
        //             quantity : req.body.quantity,
        //         });
        //         book.save() 
        //             .then( () => {
        //                 res.redirect('/admin/managerItems');
        //             })
        //     }
        // })  
        res.render('addItems');
    }
    async add(req, res, next){
       await upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log("A Multer error occurred when uploading."); 
            } else if (err) {
              console.log();
              console.log("An unknown error occurred when uploading." + err);
            }else{
                let book = new Books({
                    name : req.body.name,
                    description : req.body.description,
                    nameAuthor : req.body.nameAuthor,
                    publicLocation : req.body.publicLocation,
                    image : req.file.filename,
                    priceOld : req.body.priceOld,
                    priceCurrent : req.body.priceCurrent,
                    quantity : req.body.quantity,
                });
                book.save() 
                    .then( () => {
                        res.redirect('/admin/managerItems');
                    })
            }
        })  
    }
}   
        
module.exports = new HomeController;
       

