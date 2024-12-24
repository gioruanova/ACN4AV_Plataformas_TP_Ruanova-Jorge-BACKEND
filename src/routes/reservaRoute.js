const express = require('express');
const router = express.Router();


const reservaController = require("../controllers/reservaController");

//Rutas para las salas
router.get("/reservas", reservaController.index);
router.get("/reserva/:id", reservaController.show);
router.get("/reservas-usuario/:id", reservaController.showByUser);
router.post("/crear-reserva", reservaController.store);
router.put("/cancelar-reserva/:id", reservaController.update);

module.exports = router;