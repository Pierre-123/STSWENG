const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// styles??? I'm just checkin out old code
app.use(express.static('public'));
// middleware to parse JSON bodies, currently for registration->r_form
app.use(express.json());
// more middle ware for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
const regisRoute = require('./routes/registration_route');
const rformRoute = require('./routes/registration_form_route');
const loginRoute = require('./routes/login_route');

// Routes - Pages
app.use('/registration_route', regisRoute);
app.use('/login_route', loginRoute);
app.use('/registration_form_route', rformRoute);

app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs'); // set default file extenstion for views as .hbs
app.set('views', './views'); // set dir for views

require('./database'); // mongodb stuff now in database

app.get('/', (req, res) => {
  res.redirect('/registration_route');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ctrl + c in terminal to stop

app.use((req, res, next) => {
  // console.log(req.url); // returns like the /users, /posts stuffs
  console.log(`${req.method}:${req.url}`); // log method and url, GET:/users
  next();
});

// Import the Pet model
const Pet = require('./database/schemas/Pet');

// Route to handle form submission and save data to the database
// Update the route to handle form submission and save data to the database
app.post('/create-pet', async (req, res) => {
  try {
    // Log the request body to ensure correct form submission
    console.log(req.body);

    // Create new pet document
    const pet = new Pet({
      name: req.body.petName,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      size: req.body.size,
      behaviorsAndCharacteristics: req.body.behaviorsAndCharacteristics,
      shelter: req.body.shelter
    });

    // Save pet document to MongoDB
    await pet.save();

    // Redirect or send success response
    res.send('Pet profile created successfully!');
  } catch (error) {
    // Handle any errors
    console.error('Error creating pet profile:', error);
    res.status(500).send('Error creating pet profile');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, redirect or send success response
      res.send('Login successful!');
    } else {
      // User not found, redirect or send failure response
      res.send('Invalid username or password');
    }
  } catch (error) {
    // Handle any errors
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});
