const { Router } = require("express");
const express = require("express");
const { Op } = require("sequelize");
const db = require("../db.js");
const router = Router();
router.use(express.json());
const cors = require("cors");
router.use(cors());

//?----POSTS---------------------------------------
router.get("/Allposts", async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      attributes: [
        "id",
        "active",
        "hour_post",
        "date_post",
        "date_ini",
        "date_fin",
        "needs",
        "availableTime_0",
        "availableTime_1",
        "agePatient",
        "namePatient",
        "addressPatient",
      ],

      include: [
        {
          model: db.Users,
          attributes: ["id", "name", "surname", "age"],

          //required: true,
        },
        {
          model: db.Specialties,
          attributes: ["specialty"],
          //required: true,
        },
        {
          model: db.Cities,
          attributes: ["name"],
        },
        {
          model: db.States,
          attributes: ["name"],
        },
        {
          model: db.Countries,
          attributes: ["name"],
          //required: true,
        },
      ],
    });

    if (posts.length > 0) {
      res.status(201).json(posts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.send(error);
  }
});
//?------------------------------------------------------

//?**----CONTRACTS -------------------------------------
router.get("/AllContracts", async (req, res) => {
  try {
    const contracts = await db.Contracts.findAll({
      attributes: ["id", "status", "price", "date", "hour", "postId"],
      include: [
        {
          model: db.Auctions,
          attributes: ["id", "cancel", "offer", "comment", "approved"],

          include: [
            {
              model: db.Posts,
              attributes: [
                "date_post",
                "date_ini",
                "date_fin",
                "needs",
                "active",
                "locationReference",
                "contact_phone",
                "agePatient",
                "namePatient",
                "addressPatient",
              ],
              include: [
                {
                  model: db.Cities,
                  attributes: ["name"],
                },
                {
                  model: db.States,
                  attributes: ["name"],
                },
                {
                  model: db.Countries,
                  attributes: ["name"],
                },
                {
                  model: db.Users,
                  attributes: ["name", "surname", "email", "phone", "photo"],
                },
              ],
            },
            {
              model: db.Professionals,
              attributes: ["cvu"],
              include: [
                {
                  model: db.Users,
                  attributes: [
                    "name",
                    "surname",
                    "phone",
                    "age",
                    "document",
                    "email",
                    "photo",
                  ],
                  include: [
                    {
                      model: db.Cities,
                      attributes: ["name"],
                    },
                    {
                      model: db.States,
                      attributes: ["name"],
                    },
                    {
                      model: db.Countries,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (contracts.length > 0) {
      res.status(201).json(contracts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/AllContractsActivo", async (req, res) => {
  try {
    const contracts = await db.Contracts.findAll({
      where: { status: "activo" },
      attributes: ["id", "price", "date", "hour", "postId"],
      include: [
        {
          model: db.Auctions,
          attributes: ["id", "offer", "comment", "approved"],

          include: [
            {
              model: db.Posts,
              attributes: [
                "date_post",
                "date_ini",
                "date_fin",
                "needs",
                "active",
                "locationReference",
                "contact_phone",
                "agePatient",
                "namePatient",
                "addressPatient",
              ],
              include: [
                {
                  model: db.Cities,
                  attributes: ["name"],
                },
                {
                  model: db.States,
                  attributes: ["name"],
                },
                {
                  model: db.Countries,
                  attributes: ["name"],
                },
                {
                  model: db.Users,
                  attributes: ["name", "surname", "email", "phone", "photo"],
                },
              ],
            },
            {
              model: db.Professionals,
              attributes: ["cvu"],
              include: [
                {
                  model: db.Users,
                  attributes: [
                    "name",
                    "surname",
                    "phone",
                    "age",
                    "document",
                    "email",
                    "photo",
                  ],
                  include: [
                    {
                      model: db.Cities,
                      attributes: ["name"],
                    },
                    {
                      model: db.States,
                      attributes: ["name"],
                    },
                    {
                      model: db.Countries,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (contracts.length > 0) {
      res.status(201).json(contracts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/AllContractsTerminado", async (req, res) => {
  try {
    const contracts = await db.Contracts.findAll({
      where: { status: "terminado" },
      attributes: ["id", "price", "date", "hour", "postId"],
      include: [
        {
          model: db.Auctions,
          attributes: ["id", "offer", "comment", "approved"],

          include: [
            {
              model: db.Posts,
              attributes: [
                "date_post",
                "date_ini",
                "date_fin",
                "needs",
                "active",
                "locationReference",
                "contact_phone",
                "agePatient",
                "namePatient",
                "addressPatient",
              ],
              include: [
                {
                  model: db.Cities,
                  attributes: ["name"],
                },
                {
                  model: db.States,
                  attributes: ["name"],
                },
                {
                  model: db.Countries,
                  attributes: ["name"],
                },
                {
                  model: db.Users,
                  attributes: ["name", "surname", "email", "phone", "photo"],
                },
              ],
            },
            {
              model: db.Professionals,
              attributes: ["cvu"],
              include: [
                {
                  model: db.Users,
                  attributes: [
                    "name",
                    "surname",
                    "phone",
                    "age",
                    "document",
                    "email",
                    "photo",
                  ],
                  include: [
                    {
                      model: db.Cities,
                      attributes: ["name"],
                    },
                    {
                      model: db.States,
                      attributes: ["name"],
                    },
                    {
                      model: db.Countries,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (contracts.length > 0) {
      res.status(201).json(contracts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/AllContractsCancelado", async (req, res) => {
  try {
    const contracts = await db.Contracts.findAll({
      where: { status: "cancelado" },
      attributes: ["id", "price", "date", "hour", "postId"],
      include: [
        {
          model: db.Auctions,
          attributes: ["id", "offer", "comment", "approved"],

          include: [
            {
              model: db.Posts,
              attributes: [
                "date_post",
                "date_ini",
                "date_fin",
                "needs",
                "active",
                "locationReference",
                "contact_phone",
                "agePatient",
                "namePatient",
                "addressPatient",
              ],
              include: [
                {
                  model: db.Cities,
                  attributes: ["name"],
                },
                {
                  model: db.States,
                  attributes: ["name"],
                },
                {
                  model: db.Countries,
                  attributes: ["name"],
                },
                {
                  model: db.Users,
                  attributes: ["name", "surname", "email", "phone", "photo"],
                },
              ],
            },
            {
              model: db.Professionals,
              attributes: ["cvu"],
              include: [
                {
                  model: db.Users,
                  attributes: [
                    "name",
                    "surname",
                    "phone",
                    "age",
                    "document",
                    "email",
                    "photo",
                  ],
                  include: [
                    {
                      model: db.Cities,
                      attributes: ["name"],
                    },
                    {
                      model: db.States,
                      attributes: ["name"],
                    },
                    {
                      model: db.Countries,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (contracts.length > 0) {
      res.status(201).json(contracts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/activoContract/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Contracts.update(
        {
          status: "activo",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Contrato activo");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/terminadoContract/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Contracts.update(
        {
          status: "terminado",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Contrato terminado");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/canceladoContract/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Contracts.update(
        {
          status: "cancelado",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Contrato cancelado");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//?**-------------------------------------------------------

//?-----OFFERS-------------------------------------------
router.get("/AllAuctions", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await db.Auctions.findAll({
      where: { cancel: 0 },
      attributes: ["id", "cancel", "date", "offer", "comment"],
      include: [
        {
          model: db.Posts,
          attributes: [
            "date_post",
            "date_ini",
            "date_fin",
            "needs",
            "locationReference",
            "availableTime_0",
            "availableTime_1",
            "agePatient",
            "namePatient",
            "addressPatient",
          ],

          include: [
            {
              model: db.Cities,
              attributes: ["name"],
            },
            {
              model: db.States,
              attributes: ["name"],
            },
            {
              model: db.Countries,
              attributes: ["name"],
              //required: true,
            },
          ],
        },

        {
          model: db.Professionals,
        },
      ],
    });

    if (posts.length > 0) {
      res.status(201).json(posts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/AllAuctionsNOApproved", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await db.Auctions.findAll({
      where: { [Op.and]: [{ approved: 0 }, { cancel: 0 }] },
      attributes: ["id", "date", "offer", "comment"],
      include: [
        {
          model: db.Posts,
          attributes: [
            "date_post",
            "date_ini",
            "date_fin",
            "needs",
            "locationReference",
            "availableTime_0",
            "availableTime_1",
            "agePatient",
            "namePatient",
            "addressPatient",
          ],

          include: [
            {
              model: db.Cities,
              attributes: ["name"],
            },
            {
              model: db.States,
              attributes: ["name"],
            },
            {
              model: db.Countries,
              attributes: ["name"],
              //required: true,
            },
          ],
        },

        {
          model: db.Professionals,
        },
      ],
    });

    if (posts.length > 0) {
      res.status(201).json(posts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/AllAuctionsApproved", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await db.Auctions.findAll({
      where: { [Op.and]: [{ approved: 1 }, { cancel: 0 }] },
      attributes: ["id", "date", "offer", "comment"],
      include: [
        {
          model: db.Posts,
          attributes: [
            "date_post",
            "date_ini",
            "date_fin",
            "needs",
            "locationReference",
            "availableTime_0",
            "availableTime_1",
            "agePatient",
            "namePatient",
            "addressPatient",
          ],

          include: [
            {
              model: db.Cities,
              attributes: ["name"],
            },
            {
              model: db.States,
              attributes: ["name"],
            },
            {
              model: db.Countries,
              attributes: ["name"],
              //required: true,
            },
          ],
        },

        {
          model: db.Professionals,
        },
      ],
    });

    if (posts.length > 0) {
      res.status(201).json(posts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/AllCancel", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await db.Auctions.findAll({
      where: { cancel: 1 },
      attributes: ["id", "date", "offer", "comment"],
      include: [
        {
          model: db.Posts,
          attributes: [
            "date_post",
            "date_ini",
            "date_fin",
            "needs",
            "locationReference",
            "availableTime_0",
            "availableTime_1",
            "agePatient",
            "namePatient",
            "addressPatient",
          ],

          include: [
            {
              model: db.Cities,
              attributes: ["name"],
            },
            {
              model: db.States,
              attributes: ["name"],
            },
            {
              model: db.Countries,
              attributes: ["name"],
              //required: true,
            },
          ],
        },

        {
          model: db.Professionals,
        },
      ],
    });

    if (posts.length > 0) {
      res.status(201).json(posts);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/cancelAuction/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Auctions.update(
        {
          cancel: 1,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Oferta cancelada");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
router.put("/activeAuction/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id && Number.isInteger(parseInt(id))) {
      await db.Auctions.update(
        {
          cancel: 0,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send("Oferta activada");
    } else {
      return res.status(400).json({
        error: "no se envió id",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
//?--------------------------------------------------------
//!---------------------------INDICADORES--------------------------
router.get("/indicadores", async (req, res) => {
  try {
    let obj = {
      usuarios: {},
    };
    var { count, rows } = await db.Users.findAndCountAll({
      where: { active: 1 },
    });
    obj.usuarios = count;

    var { count, rows } = await db.Professionals.findAndCountAll({
      where: { active: 1 },
    });
    obj.professionals = count;

    var { count, rows } = await db.Professionals.findAndCountAll({
      where: {
        [Op.and]: [{ active: 1 }, { balance: 1 }],
      },
    });
    obj.members = count;
    var { count, rows } = await db.Posts.findAndCountAll({
      where: { active: 1 },
    });
    obj.posts = count;
    var { count, rows } = await db.Auctions.findAndCountAll({
      where: { cancel: 0 },
    });
    obj.aplicaciones = count;
    var { count, rows } = await db.Contracts.findAndCountAll({
      where: { status: "activo" },
    });
    obj.contractsactive = count;
    obj.priceactivo = await db.Contracts.sum("price", {
      where: { status: "activo" },
    });
    obj.pricetotal = await db.Contracts.sum("price", {});

    return res.status(200).send(obj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
