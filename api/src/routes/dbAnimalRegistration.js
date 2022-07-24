const { Router } = require("express");
const express = require("express");
const db = require("../db.js");

const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

router.post("/animaldbregistration", async (req, res) => {
  console.log("Where? -->>", req.url);
  try {
    const { name, gender, race, animalType, photo } = req.body;

    const [animalCreated, created] = await db.Animals.findOrCreate({
      where: { photo: photo },
      defaults: {
        name: name,
        gender: gender,
        race: race,
        animalType: animalType,
        photo: photo,
      },
    });

    let mensaje = {};

    if (created) {
      mensaje = { animalCreated: animalCreated.id, message: "Animal Created" };

      const { id, name } = animalCreated;
      res.status(201).json(mensaje);
    } else {
      mensaje = { message: "Animal exists" };
      res.status(422).json(mensaje);
    }
  } catch (e) {
    console.log("I am here", e);
    res.send(e);
  }
});

module.exports = router;
