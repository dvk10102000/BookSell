const shortid = require('shortid');

const Cart = require('../model/cart');

module.exports =  function(req, res, next){
    if(!req.signedCookies.sessionId)
    {
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId,{
            signed: true,
            // expires: new Date(Date.now() + 200000),
        });
        
        let cart = new Cart({
            id: sessionId,
        }).save();
    }
    next();
}