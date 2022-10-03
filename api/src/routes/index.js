const { Router } = require('express');
const breedRequests = require('./breedRequests');
const TemperRequests = require('./TemperRequests');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/breed', breedRequests);
router.use('/temper', TemperRequests)

module.exports = router;
