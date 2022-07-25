const { Router } = require("express");
const express = require("express");
const { Op } = require("sequelize");
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
      ],

      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "phone", "address"],

          //required: true,
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
    const pets = await db.Posts.findAll({
      where: { status: 1 },
      attributes: ["id", "name", "gender"],

      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "phone", "address"],
        },
      ],
    });

    if (posts.length > 0) {
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
    const pets = await db.Posts.findAll({
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

router.put("/activePost/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Posts.update(
        {
          active: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Post active");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//?--------------------------------------------------

//?**----USERS-----------------------------------
router.put("/userAdmin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Users.update(
        {
          userType: "admin",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("User administrador");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/userUsuario/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Users.update(
        {
          userType: "usuario",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("User sin permisos");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
//?**---------------------------------------------

module.exports = router;
