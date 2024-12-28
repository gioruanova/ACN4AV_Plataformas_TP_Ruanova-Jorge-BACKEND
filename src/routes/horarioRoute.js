const express = require("express");
const router = express.Router();

const horarioController = require("../controllers/horarioController");

// MIDD AUTH
const { requireAuth } = require("../middleware/auth");

//Rutas para las salas
router.get("/rangoshorarios", requireAuth, horarioController.index);

module.exports = router;
