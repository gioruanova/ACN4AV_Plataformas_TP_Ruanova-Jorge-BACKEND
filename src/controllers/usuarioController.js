const usuarioModel = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { dni, password, nombre, apellido, email, isAdmin } = req.body;

  try {
    await usuarioModel.register({
      nombre,
      apellido,
      email,
      dni,
      password,
      isAdmin,
    });
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "El DNI o email ya están registrados.",
      });
    }

    res
      .status(500)
      .json({ success: false, message: "Error al registrar el usuario." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await usuarioModel.login({ email, password });
    if (usuario == null) {
      res.json({ success: false, message: "Credenciales incorrectas" });
    } else {
      const payload = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        dni: usuario.dni,
        isAdmin: usuario.isAdmin == "1",
      };

      // Access token
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      // Refresh token
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Inicio de sesión exitoso",
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        isAdmin: usuario.isAdmin == "1",
        id_usuario: usuario.id_usuario,
        dni: usuario.dni,
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al intentar iniciar sesión" });
  }
};

exports.refreshToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token de autenticación no proporcionado",
    });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ success: false, message: "Formato de token no válido" });
  }
  try {
    const usuario = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    const payload = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      dni: usuario.dni,
      isAdmin: usuario.isAdmin,
    };
    const newAccessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({
      success: true,
      accessToken: newAccessToken,
      isAdmin: usuario.isAdmin,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token de autenticación inválido" });
  }
};

// Ruta protegida
exports.welcome = (req, res) => {
  res.json({
    success: true,
    nombre: req.user.nombre,
    apellido: req.user.apellido,
    email: req.user.email,
    id_usuario: req.user.id_usuario,
    message: "Usuario",
    isAdmin: req.user.isAdmin,
    dni: req.user.dni,
  });
};

exports.quitarAdmin = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  try {
    await usuarioModel.updateQuitarAdmin({ isAdmin, id });

    res.json({
      success: true,
      message: "Se ha quitado privilegio de admin para el usuario",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al gestionar usuario" });
  }
};

exports.agregarAdmin = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  try {
    await usuarioModel.updateAgregarAdmin({ isAdmin, id });

    res.json({
      success: true,
      message: "Se ha agregado privilegio de admin para el usuario",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al gestionar usuario" });
  }
};

// TRAER TODOS LOS USUARIOS
exports.mostrarUsuarios = async (req, res) => {
  try {
    [results] = await usuarioModel.all();
    res.json({ success: true, results: results });
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
};
