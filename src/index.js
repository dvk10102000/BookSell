const express = require('express')
const path = require('path');
const handlebars  = require('express-handlebars');
const route = require('./routes/index');
const db = require('./config/db');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

const isAuth = require('./app/middleware/is-auth');
 

const port = 3000;

app.use(express.urlencoded({
  extended:true
}));

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));


app.engine('hbs', handlebars({
  extname: '.hbs'
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

app.use(isAuth);

app.set('view engine', 'hbs');

app.set('views',path.join(__dirname,'resources/views'));




  
db.connect();
route(app);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




//search app.use defferent with app.get