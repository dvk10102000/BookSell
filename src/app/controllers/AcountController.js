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
        user.status = 'active';
        User.updateOne({email},user)
            .then();
        // if(req.session.Authorization === 'admin'){
        //     console.log('khang handsome');
        //     res.redirect('/admin')
        // }else{
        //     console.log('khang pretty');

            res.redirect("/");
        // }
    }

    async logOut(req, res,next){
        const user = await User.findOne({ email : req.session.email });
        user.status = 'noActive';
        user.timeOut = Date.now() - user.timeOut;
        User.updateOne({ email : req.session.email},user)
            .then();
        req.session.destroy((err) => {
            if (err) throw err;
            res.redirect("/acount/login");
          });
    }

   async update(req, res,next){
       
       let user = await User.findOne({email : req.session.email});
        // console.log(req.body.avartar);
        if(req.body.avartar == ''){
            user.avartar = req.session.imageAvatar;
        }
        else{
            user.avartar = req.body.avartar;
            req.session.imageAvatar = req.body.avartar;
        }

        user.name = req.body.name;
        user.gender = req.body.gender;
        user.birth = req.body.birth;
        user.address = req.body.address;
        user.phoneNumber = req.body.phoneNumber;
        User.updateOne({email : req.session.email}, user)
            .then( ()=> {
                // console.log(user);
                res.redirect("back");
            })
       
    }

}

module.exports =  new DetailProductController;




