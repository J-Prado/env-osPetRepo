const { Router } = require("express");
const express = require("express");
const { Op } = require("sequelize");
const db = require("../db.js");
const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

router.get("/type/", async (req, res) => {
  try {
    const { type } = req.query;
    const pets = await db.Animals.findAll({
      where: { animalType: `${type}` },
      attributes: [
        "id",
        "name",
        "gender",
        "status",
        "race",
        "animalType",
        "size",
        "age",
        "photo",
        "owner",
        "description",
      ],
    });

    if (pets.length > 0) {
      res.status(201).json(pets);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/race/", async (req, res) => {
  try {
    const { race } = req.query;
    const pets = await db.Animals.findAll({
      where: { race: `${race}` },
      attributes: [
        "id",
        "name",
        "gender",
        "status",
        "race",
        "animalType",
        "size",
        "age",
        "photo",
        "owner",
        "description",
      ],
    });

    if (pets.length > 0) {
      res.status(201).json(pets);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/gender/", async (req, res) => {
  try {
    const { gender } = req.query;
    const pets = await db.Animals.findAll({
      where: { gender: `${gender}` },
      attributes: [
        "id",
        "name",
        "gender",
        "status",
        "race",
        "animalType",
        "size",
        "age",
        "photo",
        "owner",
        "description",
      ],
    });

    if (pets.length > 0) {
      res.status(201).json(pets);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/age/", async (req, res) => {
  try {
    const { age } = req.query;
    const pets = await db.Animals.findAll({
      where: { age: age },
      attributes: [
        "id",
        "name",
        "gender",
        "status",
        "race",
        "animalType",
        "size",
        "age",
        "photo",
        "owner",
        "description",
      ],
    });

    if (pets.length > 0) {
      res.status(201).json(pets);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
