const express = require('express');
const router = express.Router();
const User = require('../database/schemas/User');


router.get('/', async (req, res) => {
    try {
        // Retrieve the role from the query parameters
        const role = req.query.role;
        console.log('bruh: ', role)
        // Render the registration form view with the role information
        res.render('registration_form', { title: "Registration Form"});
    } catch (err) {
        console.error('Error rendering registration form:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/register', async (req, res) => {
    try {
        // Extract data from the request body
        
        const { username, email, password, password_confirm } = req.body;
        console.log(req.body);
        console.log('Role from request body:', role);
        // Perform any necessary validation checks here
        if (password!==password_confirm){
            console.log('nuh uh')
            return res.render('registration_form', { title: "Registration Form", error: "Passwords do not match"});
        }
        // Create a new user object
        const newUser = new User({
            username,
            password, // hashing soon
            email,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Redirect the user to a success page or any other appropriate action
        console.log('redirect to login')
        res.redirect('login');
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;