const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/schemas/User');

// eslint-disable-next-line new-cap
const router = express.Router();
// MongoDB connection or other setup can be done outside this snippet

router.get('/', async (req, res) => {
  try {
    res.render('login', {title: 'Login Page'});
  } catch (err) {
    console.error('Error rendering login page:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginUser = await User.findOne({username: req.body.username});

    if (loginUser) {
      // Compare hashed password
      const isMatch =
          await bcrypt.compare(req.body.password, loginUser.password);
      if (isMatch) {
        console.log('Login Success');
        // Implement session or token based authentication in real scenarios
        // Ensure this is the correct path for your application
        // 302
        res.redirect('/petSearch.html');
      } else {
        console.log('Login Fail - Invalid password');
        return res.render('login',
            {error: 'Invalid username/password', title: 'Login Page'});
      }
    } else {
      console.log('Login Fail - Invalid username');
      return res.render('login',
          {error: 'Invalid username/password', title: 'Login Page'});
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
