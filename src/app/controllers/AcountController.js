const User = require('../model/user');
const { mongooseToObject } = require('../../util/mongoose');

class DetailProductController{
    show(req, res,next){
        User.findOne({email : req.session.email})
            .then(user => {
                    res.render('acount', 
                    mongooseToObject(user),
                    )
         })
            .catch(next);
      
        
    }

    register(req, res,next){
        const error = req.session.error;
        delete req.session.error;
        res.render('register', { err: error });
        
    }

    login(req, res,next){
        const error = req.session.error;
        delete req.session.error;
        res.render('login', { err: error });
        
    }

    async registerPost(req, res, next){
        
      

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            req.session.error = "User already exists";
            return res.redirect("/acount/register");
        }

      

        user = new User({
            name,
            email,
            password,
        });

        await user.save();
        res.redirect("/acount/login");
    }



    async LoginPost(req, res) {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        

        if (!user) {
            req.session.error = "Login failure !!";
            return res.redirect("/acount/login");
        }
        
        const isMatch = password.normalize() === user.password.normalize();

        if (!isMatch) {
            req.session.error = "Login failure !! ";
            return res.redirect("/acount/login");
        }

        req.session.isAuth = true;
        req.session.fullName = user.name;
        req.session.email = email;
        req.session.imageAvatar = user.avartar;
        
        req.session.Authorization = user.permission;
        res.redirect("/");
    }

    logOut(req, res,next){
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect("/acount/login");
          });
    }

    update(req, res,next){
        
        User.updateOne({_id: req.params.id}, req.body)
            .then(() =>{
                req.session.imageAvatar = req.body.avartar;
                // console.log(req.session.imageAvatar);
                res.redirect("back");
            })
            .catch(next);
    }

}

module.exports =  new DetailProductController;