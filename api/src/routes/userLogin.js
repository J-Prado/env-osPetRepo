const express = require("express");
const router = express.Router();
// const passport = require("../passport/passport.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = require("../db.js");
const cors = require("cors");

router.use(
  cors({
    origin: true, //process.env.URL_CLIENT,
    credentials: true,
    //allowedHeaders: "Content-Type, Authorization",
  })
);

router.use(cookieParser());

router.use(express.json());

router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await db.Users.findOne({
      where: {
        email: email,
      },
      //   include: [
      //     {
      //       model: db.,
      //       attributes: [],
      //     },
      //   ],
      raw: true,
    });
    console.log(userFound);

    if (!userFound) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    if (userFound.active === 0) {
      return res.status(401).json({ error: "User is inactive" });
    }

    bcrypt.compare(password, userFound.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Error checking password",
        });
      }
      if (!result) {
        return res.status(401).json({ error: "Wrong password" });
      }
      // console.log("SEQUELIZE userFound", userFound);
      // TOKEN JWT
      const userInfoFront = {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name,
        lastname: userFound.lastname,
        phone: userFound.phone,
        address: userFound.address,
      };

      // console.log("userInfoFront", userInfoFront);
      const tokenFront = jwt.sign(userInfoFront, process.env.TOKENKEY, {
        expiresIn: "3h",
      });
      const tokenBack = jwt.sign({ id: userFound.id }, process.env.TOKENKEY, {
        expiresIn: "3h",
      });

      // COOKIE BACKEND
      res.cookie("userBackend", tokenBack, {
        //domain: "*",
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //3 hours expiration
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      // COOKIE FRONTEND
      const idToken = userFound.id;
      res.cookie("SessionUserPet", idToken, {
        //domain: "*",
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //3 hours expiration
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      // RESPONSE
      res.status(200).json({
        message: "Login success",
        token: tokenFront,
        userId: idToken,
      });
    });
  } catch (e) {
    return res.status(401).json({
      error: e,
    });
  }
});

//RUTA SOLO PARA PROBAR LECTURA DE COOKIE con jwt.verify
router.get("/cookieBackendRead", (req, res) => {
  try {
    console.log("req.cookies", req.cookies);
    const token = req.cookies.userBackend;
    const decoded = jwt.verify(token, process.env.TOKENKEY);

    console.log("decoded", decoded);

    res.status(200).json({
      message: "Cookie read",
    });
  } catch (e) {
    res.status(401).json({
      error: e,
    });
  }
});

module.exports = router;
