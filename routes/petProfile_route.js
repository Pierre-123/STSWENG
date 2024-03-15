const { Router } = require('express'); 
const router = Router();
const Pet = require('../database/schemas/Pet');

router.get('/:id', async (req,res)=>{
    try {
        const pet = await Pet.findById(req.params.id).lean();
        console.log('Pet ID:', pet)
        if(!pet){
            return res.status(404).send('Pet not found');
        }
        res.render('petProfile', { pet: pet });
    } catch (err) {
        console.error("Error fetching pets:", err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;