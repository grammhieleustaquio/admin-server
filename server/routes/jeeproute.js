const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const JeepRoute = require("../models/JeepRoute");

router.get("/", (req, res) => {
  JeepRoute.findAll({})
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.post("/get_route", (req, res) => {
  let { value } = req.body;

  JeepRoute.findAll({
    where: {
      barangayId: {
        [Op.like]: value,
      },
    },
  })
    .then((_res) => {
      res.json(_res);
    })
    .catch((error) => console.log(error));
});

router.post("/add_route", (req, res) => {
  console.log("add to barangay table");
  let { barangayId, pointNumber, routeDescription } = req.body;

  JeepRoute.create({ barangayId, pointNumber, routeDescription })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

router.delete("/delete_route", (req, res) => {
  let { id } = req.query;
  console.log(id);

  JeepRoute.destroy({ where: { id } })
    .then((response) => {
      res.json({ success: true, msg: "Succefully deleted route" });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
