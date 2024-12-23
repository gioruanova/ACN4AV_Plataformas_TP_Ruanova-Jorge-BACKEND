const reservaModel = require("../models/reservaModel");

// RESERVAS TOTALES
exports.index = async (req, res) => {
  try {
    [results] = await reservaModel.all();
    res.json({ success: true, results: results });
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
};

// RESERVA POR ID DE RESERVA
exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await reservaModel.find(id);
    if (result == null) {
      res
        .status(404)
        .json({ succsess: false, message: "La reserva no existe" });
    } else {
      res.json({ succsess: true, result });
    }
  } catch (error) {}
};

// RESERVAS POR ID DE USUARIO
exports.showByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await reservaModel.findByUser(id);

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No se encontraron reservas para este usuario",
        });
    }

    res.json({ success: true, results });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor", error });
  }
};
