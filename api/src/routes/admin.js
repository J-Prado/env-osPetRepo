const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

//----Animal Management---------------------------------------
router.get("/allpets", async (req, res) => {
  try {
    const pets = await db.Animals.findAll({
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
        // "description",
      ],

      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "phone", "address"],
        },
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

router.get("/allpetsadopted", async (req, res) => {
  try {
    const pets = await db.Animals.findAll({
      where: { status: 1 },
      attributes: ["id", "name", "gender"],
      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "phone", "address"],
        },
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

router.get("/allpetsnoadopted", async (req, res) => {
  try {
    const pets = await db.Animals.findAll({
      where: { status: 0 },
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

      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "phone", "address"],
        },
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

router.put("/changestatus/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      await db.Animals.update(
        {
          status: true,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).send("Status Changed");
    } else {
      return res.status(400).json({
        error: "ID is required",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//?--------------------------------------------------

//?**---------------------------------------------

module.exports = router;
