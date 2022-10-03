const { Router } = require('express');

const axios = require('axios');
const { Breed, Temper } = require('../db')

const router = Router();

let breedsApi = [];
let breedsApiDataOfInterest = [];

axios.get('https://api.thedogapi.com/v1/breeds')
    .then(data => {

        breedsApi = data.data;
        breedsApiDataOfInterest = breedsApi.map(e => {
            return {
                id: e.id,
                name: e.name,
                height: e.height.metric,
                weight: e.weight.metric,
                temperaments: e.temperament,
                image: e.image.url,
                weightAverage: (parseInt(e.weight.metric.split('-')[0]) + parseInt(e.weight.metric.split('-')[1]) / 2)
            }
        });
    })



router.get('/', async (req, res, next) => {


    try {

        const { name } = req.query;
        let breedsDb = await Breed.findAll({ include: Temper });
        let allBreeds = [...breedsApiDataOfInterest, ...breedsDb];

        if (!name) {
            return res.json(allBreeds);
        }

        await Breed.findAll({ include: Temper }).then(data => {
            breedsDb = data.filter(e => e.name.toUpperCase().includes(name.toUpperCase()))
        }, { include: Temper });
        let breedsButJustImportantThings = breedsApiDataOfInterest.filter(e => e.name.toUpperCase().includes(name.toUpperCase()));
        allBreeds = [...breedsDb, ...breedsButJustImportantThings];
        if (!allBreeds.length) { return res.status(400).send("ERROR: no coincidences") }
        return res.json(allBreeds);

    } catch (err) {
        next(err);
    }

});

router.get('/id/:id', async (req, res, next) => {

    try {
        const { id } = req.params;
        let breed;
        if (id.length < 8) {

            breed = breedsApiDataOfInterest.find((e) => e.id === parseInt(id));

            res.json(breed);
        } else {
            breed = await Breed.findByPk(id, { include: Temper });
            res.json(breed);
        }

    } catch (err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {
    try {
        let { name, height, weight, image, tempers } = req.body;
        if (!tempers) tempers = [];
        const temperaments = tempers.join(', ');
        if (!name || !height || !weight || !image) { res.status(400).send(new Error('falta data carnal')) }
        let alreadyExist = await Breed.findOne({ where: { name: name } });
        if (alreadyExist) { return res.status(400).send(new Error('already exists')) }
        const newRow = await Breed.create({
            name,
            height,
            weight,
            image,
            temperaments
        });

        if (tempers.length) {
            tempers.forEach(async temper => {
                let newTemperToAdd = await Temper.findOne({ where: { name: temper } });
                if (newTemperToAdd) {
                    await newRow.addTemper(newTemperToAdd);
                }

            });
        }

        res.send('Breed created successfully');
    } catch (err) {
        next(err);
    }


});

router.patch('/id/:id', async (req, res, next) => {
    const id = req.params.id;
    let { newTemper, newName, newHeight, newWeight, newImage } = req.body;
    if (!newTemper) newTemper = [];
    let updatedOne = await Breed.findByPk(id, { include: Temper });


    try {


        if (!updatedOne) { return res.status(400).send('ERROR: Cant match any breed with the given ID') }


        const updatedComponent = await updatedOne.update({
            name: newName || this.name,
            height: newHeight || this.height,
            weight: newWeight || this.weight,
            image: newImage || this.image,
        })

        if (newTemper.length) {
            newTemper.forEach(async temper => {
                let newTemperToAdd = await Temper.findOne({ where: { name: temper } });
                if (newTemperToAdd) {
                    await updatedComponent.addTemper(newTemperToAdd);
                }

            });
        }
        await updatedComponent.save();

        let prueba = await Breed.findByPk(id, { include: Temper });
        return res.json(prueba);




    } catch (err) {
        next(err)
    }

});

router.delete('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id;


        const breed = await Breed.findByPk(id);
        if (!breed) { return res.status(400).send("ERROR: No breed can be found") }

        await Breed.destroy({
            where: {
                id: id
            }
        })


        let breedsDb = await Breed.findAll({ include: Temper });

        res.send([...breedsApiDataOfInterest, ...breedsDb]);

    } catch (err) {
        next(err);
    }
});





module.exports = router;


