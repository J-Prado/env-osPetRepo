const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animaldbregistration = require("./dbAnimalRegistration.js");
const userdbregistration = require("./dbUserRegistration.js");
const userlogin = require("./userLogin.js");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", animaldbregistration);
router.use("/", userdbregistration);
router.use("/", userlogin);
module.exports = router;
