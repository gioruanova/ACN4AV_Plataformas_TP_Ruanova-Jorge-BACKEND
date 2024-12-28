const express = require("express");
const { requireAuth } = require("../middleware/auth");
const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

// Registro y Login
router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);

// Rutas protegidas
router.get("/usuarios", requireAuth, usuarioController.mostrarUsuarios);
router.get("/welcome", requireAuth, usuarioController.welcome);
router.put("/agregar-admin/:id", requireAuth, usuarioController.agregarAdmin);
router.put("/quitar-admin/:id", requireAuth, usuarioController.quitarAdmin);

router.get("/refresh-token", usuarioController.refreshToken);

module.exports = router;
