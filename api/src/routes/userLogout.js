const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const cors = require("cors");
router.use(cors());
router.use(
  cors({
    origin: true, //process.env.URL_CLIENT,
    credentials: true,
    //allowedHeaders: "Content-Type, Authorization",
  })
);
//----
router.use(cookieParser());
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get("/userlogout", async (req, res) => {
  try {
    res.clearCookie("userBackend");
    res.clearCookie("SessionUserPet");
    res.status(200).json({
      message: "Logout success",
    });
  } catch (e) {
    return res.status(401).json({
      error: e,
    });
  }
});

module.exports = router;
