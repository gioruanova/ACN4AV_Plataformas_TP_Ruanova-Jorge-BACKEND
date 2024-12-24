const express = require("express");
const router = express.Router();

const salaController = require("../controllers/salaController");

//Rutas para las salas
router.get("/listadosalas", salaController.index);
router.get("/listadosalas/:id", salaController.show);

router.put("/deshabilitarSala/:id", salaController.updateDeshabilitar);
router.put("/habilitarSala/:id", salaController.updateHabilitar);

router.put("/quitarDestacado/:id", salaController.updateQuitarDestacado);
router.put("/agregarDestacado/:id", salaController.updateAgregarDestacado);

module.exports = router;
