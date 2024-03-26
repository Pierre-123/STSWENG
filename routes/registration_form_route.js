const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../database/schemas/User');
const router = express.Router();
const saltRounds = 10;

router.get('/', async (req, res) => {
  try {
    const {role} = req.query;
    if (role != undefined && role != null) {
      req.session.role = role;
    }
    res.render('registration_form', {title: 'Registration Form', role});
  } catch (err) {
    console.error('Error rendering registration form:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/registration_form_route', async (req, res) => {
  try {
    const {username, email, password, passwordConfirm} = req.body;

    // Basic validation checks
    // console.log(password + ', ' + passwordConfirm);

    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
      return res.render('registration_form', {
        title: 'Registration Form',
        error: 'Passwords do not match',
      });
    }

    if (!validator.isEmail(email)) {
      console.log('Invalid email format');
      return res.render('registration_form', {
        title: 'Registration Form',
        error: 'Invalid email format',
      });
    }

    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.render('registration_form', {
        title: 'Registration Form',
        error: 'Username is already taken',
      });
    }

    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.render('registration_form', {
        title: 'Registration Form',
        error: 'Email is already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    newUser.role = req.session.role;

    await newUser.save();
    console.log('User registered, redirect to login');
    res.redirect('/login');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
