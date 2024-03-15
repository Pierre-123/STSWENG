const { Router } = require('express'); 
const router = Router();
const Pet = require('../database/schemas/Pet');

router.get('/', async (req,res)=>{
    try {
        const pets = await Pet.find().lean();
        res.render('petSearch', { pets: pets, title:"Pet Search" });
    } catch (err) {
        console.error("Error fetching pets:", err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;