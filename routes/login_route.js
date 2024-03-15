const { Router } = require('express'); 
const router = Router();
const User = require('../database/schemas/User');

//also require like database stuffs for MongoDB, put here

router.get('/', async (req, res)=>{ 
    try {
        res.render('login',{title: "Login Page"});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async function(req, res){// /login_route/login
    try {
        //logic for checkin if user is adopter/kennel
        const login_user = await User.findOne({ username: req.body.username })
        if(login_user){
            const result = req.body.password === login_user.password;
            if (result){
                console.log('Login Success')
                res.redirect('/petSearch_route');
            } else {
                console.log('Login Fail');
                return res.render('login', { error: 'Invalid password', title: "Login Page" });
            }
        } else {
            console.log('Login Fail')
            return res.render('login', { error: 'Invalid username', title: "Login Page" });
        }

        //for now all reroutes to pet search, but pet search is for adopter
        console.log('Login Attempted')
        //res.redirect('/petSearch.html');
        //else go back, than error????
        
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;