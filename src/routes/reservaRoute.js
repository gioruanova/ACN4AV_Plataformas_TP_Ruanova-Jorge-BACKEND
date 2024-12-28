const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/reservaController");

// MIDD AUTH
const { requireAuth } = require("../middleware/auth");

//Rutas para las salas
router.get("/reservas", requireAuth, reservaController.index);

router.get("/reserva/:id", requireAuth, reservaController.show);
router.get("/reservas-usuario/:id", requireAuth, reservaController.showByUser);
router.post("/crear-reserva", requireAuth, reservaController.store);
router.put("/cancelar-reserva/:id", requireAuth, reservaController.update);
router.put("/reactivar-reserva/:id", requireAuth, reservaController.updateReactivar);

module.exports = router;
    