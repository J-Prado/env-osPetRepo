const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const bcrypt = require("bcrypt");
const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

router.post("/userdbregistration", async (req, res) => {
  console.log("Where? -->>", req.url);
  try {
    const { name, lastname, password, email, phone, address } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const [userCreated, created] = await db.Users.findOrCreate({
      where: { email: email },
      defaults: {
        name,
        lastname,
        password: hash,
        phone,
        address,
      },
    });

    let mensaje = {};

    if (created) {
      mensaje = { userCreated: userCreated.id, message: "User Created" };

      const { id, name } = userCreated;
      res.status(201).json(mensaje);
    } else {
      mensaje = { message: "User exists" };
      res.status(422).json(mensaje);
    }
  } catch (e) {
    console.log("I am here", e);
    res.send(e);
  }
});

module.exports = router;
