const {Router} = require('express');
// eslint-disable-next-line new-cap
const router = Router();

router.get('/', async (req, res)=>{
  try {
    console.log('1st phase registration');
    res.render('registration', {title: 'Registration'});
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
