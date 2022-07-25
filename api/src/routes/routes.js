const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const animaldbregistration = require("./dbAnimalRegistration.js");
const userdbregistration = require("./dbUserRegistration.js");
const userlogin = require("./userLogin.js");
const userlogout = require("./userLogout.js");
const admin = require("./admin.js");
const user = require("./user.js");
const getAnimal = require("./getAnimal.js");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", animaldbregistration);
router.use("/", userdbregistration);
router.use("/", userlogin);
router.use("/", userlogout);
router.use("/", admin);
router.use("/", user);
module.exports = router;
