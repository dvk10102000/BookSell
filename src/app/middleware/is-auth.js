module.exports = function (req, res, next) {
    if(req.session.isAuth){
        res.locals.fullName= req.session.fullName;
        res.locals.checkState= req.session.isAuth;
        res.locals.permission= req.session.Authorization;
        res.locals.imageAvatar= req.session.imageAvatar;
        
        // res.locals.fullName = "do van khang" ; 
    }
    next();

}