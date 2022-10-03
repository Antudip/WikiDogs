const { Router } = require('express');

const axios = require('axios');
const { Temper } = require('../db');

const router = Router();
let allTempers;
axios.get('https://api.thedogapi.com/v1/breeds')
    .then(async data => {

        allTempers = data.data.map(temper=>{
            return temper.temperament;
        }).join(',').replace(/\s+/g, '').split(',');
       
        // if(!allTempers.inclides('')){
        //     Temper.bulkCreate(allTempers);

        // }
        // console.log(allTempers);
        allTempers.forEach(async element => {
            if(element!==''){
                const el = await Temper.findOrCreate({where:{name:element}});
                // console.log(el);
            }
        });
    })

    router.get('/',async (req,res,next)=>{
        const Tempers= await Temper.findAll();
        const temperNames = Tempers.map(e=>e.name);
        res.json(temperNames);
    });


module.exports= router;