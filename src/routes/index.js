const homeRouter = require('./home');
const detailProduct = require('./detailProduct');
const acount = require('./acount');

function route(app){

    // app.use('/detail',detailBook);
    // app.use('/contact',contactRouter);
    app.use('/',homeRouter);
    app.use('/detailProduct',detailProduct);
    app.use('/acount',acount);
    
}

module.exports = route;