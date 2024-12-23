const horarioModel = require("../models/horarioModel");

// RANGOS HORARIOS
exports.index = async (req, res) => {
  try {
    [results] = await horarioModel.all();
    res.json({ success: true, results: results });
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
};

