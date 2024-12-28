const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");

//Rutas para las salas
router.get("/rangoshorarios", horarioController.index);

module.exports = router;
