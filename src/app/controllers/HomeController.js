class HomeController {

    //[GET] /Contact
    home(req, res) {
        res.render('home');
    }
}


module.exports = new HomeController;