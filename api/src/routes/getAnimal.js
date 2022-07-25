const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const search = await Animals.findOne({
        where: { id },
      });

      let searchId = {
        id: search.id,
        name: search.name,
        description: search.description,
        photo: search.photo,
        age: search.age,
        color: search.color,
        race: search.race,
        animalType: search.animalType,
        race: search.race,
        gender: search.gender,
        size: search.size,
        status: search.status,
      };
      return res.status(200).send(searchId);
    } else {
      return res.status(400).json({
        error: "ID is required",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
