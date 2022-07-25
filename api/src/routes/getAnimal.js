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
      await db.Animals.update(
        {
          status: false,
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

module.exports = router;
