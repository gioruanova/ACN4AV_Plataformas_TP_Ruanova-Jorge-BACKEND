const express = require('express');
const router = express.Router();


const salaController = require("../controllers/salaController");

//Rutas para las salas
router.get("/listadosalas", salaController.index);
router.get("/listadosalas/:id", salaController.show);

module.exports = router;