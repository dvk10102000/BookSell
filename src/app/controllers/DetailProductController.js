class DetailProductController{
    show(req, res,next){
        res.render('detailProduct');
        
    }
}

module.exports =  new DetailProductController;