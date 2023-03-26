require('dotenv').config();
const express=require('express');
const db = require('./config/mongoose');
const port= process.env.PORT || 3001;
const app=express();

const expressLayouts = require('express-ejs-layouts');


const session = require('express-session');
const path=require('path');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  

app.use(sassMiddleware({
    src: path.join(__dirname,'./assets/scss'),
    dest: path.join(__dirname,'./assets/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended:false}));



app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));



app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`) ;
});