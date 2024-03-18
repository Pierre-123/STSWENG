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

router.post('/search', async (req, res) => {
    const { species, breed, age, size } = req.body;
    console.log("Data to be finding: ")
    console.log(req.body)
    try {
        let query = {};
        if (species) query.species = species;
        if (breed) query.breed = breed;
        if (age) query.age = age;
        if (size) query.size = size;

        const pets = await Pet.find(query).lean();
        console.log("Data found: ")
        console.log(pets) //doesn't find any? even with right stuff hmm
        /*res.render('petSearch', { 
            pets: pets, 
            title: "Pet Search",
            submittedValues: req.body  // Pass submitted form values back to template
        });*/
    } catch (err) {
        console.error("Error searching pets:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;