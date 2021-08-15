const express = require('express')
const path = require('path');
const handlebars  = require('express-handlebars');
const route = require('./routes/index');
const db = require('./config/db');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');
const shortid = require('shortid');
const isAuth = require('./app/middleware/is-auth');
const listBook = require('./app/middleware/listNameBook');
const sessionID = require('./app/middleware/sessionMiddleware');
const renderCart = require('./app/middleware/renderCart');


const port = 3000;

app.use(express.urlencoded({
  extended:true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'app')));

db.connect();




app.engine('hbs', handlebars({
  extname: '.hbs', 
  helpers: {
    sum: (a, b) => a + b,
    checkStatusOrder: a =>{
      if(a == 1)
          return true;
      else
          return false;
    }
  }
  
}));

app.use(methodOverride('_method'));

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/BookStore',
  collection: "mySessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
  );
app.use(cookieParser('MY SECRET'));
app.use(sessionID);

app.use(isAuth);
app.use(listBook);
app.use(renderCart);

app.set('view engine', 'hbs');

app.set('views',path.join(__dirname,'resources/views'));




  
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




