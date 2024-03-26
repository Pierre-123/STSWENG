const express = require('express');
const session = require('express-session');
// const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// styles??? I'm just checkin out old code
app.use(express.static('public'));
// middleware to parse JSON bodies, currently for registration->r_form
app.use(express.json());
// more middle ware for URL-encoded bodies
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: '7627819857069865',
  resave: false,
  saveUninitialized: false,
}));

// Routes
const regisRoute = require('./routes/registration_route');
const rformRoute = require('./routes/registration_form_route');
const loginRoute = require('./routes/login_route');

// Routes - Pages
app.use('/registration_route', regisRoute);
app.use('/login_route', loginRoute);
app.use('/registration_form_route', rformRoute);

app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');// set default file extenstion for views as .hbs
app.set('views', './views');// set dir for views

require('./database'); // mongodb stuff now in database

app.get('/', (req, res)=> {
  res.redirect('/registration_route');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ctrl + c in terminal to stop

app.use((req, res, next)=>{// should spy n see the get stuff but idk what???
  // console.log(req.url); // returns like the /users, /posts stuffs
  console.log(`${req.method}:${req.url}`);// log method and url, GET:/users
  next();
});


