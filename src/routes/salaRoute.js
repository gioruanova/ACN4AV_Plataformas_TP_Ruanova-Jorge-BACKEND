const express = require("express");
const router = express.Router();

const salaController = require("../controllers/salaController");

// MIDD AUTH
const { requireAuth } = require("../middleware/auth");

//Rutas para las salas
router.get("/listadosalas", salaController.index);
router.get("/sala-id/:id",salaController.show);

router.put("/deshabilitarSala/:id",requireAuth, salaController.updateDeshabilitar);
router.put("/habilitarSala/:id", requireAuth,salaController.updateHabilitar);

router.put("/quitarDestacado/:id",requireAuth, salaController.updateQuitarDestacado);
router.put("/agregarDestacado/:id",requireAuth, salaController.updateAgregarDestacado);

module.exports = router;
