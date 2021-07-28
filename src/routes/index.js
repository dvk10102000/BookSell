const home = require('./home');
const product = require('./product');
const acount = require('./acount');


function route(app){

  
    app.use('/book',product);
    app.use('/acount',acount);
    app.use('/',home);
   
    
}

module.exports = route;