const salaModel = require("../models/salaModel");

// TRAER TODAS LAS SALAS
exports.index = async (req, res) => {
  try {
    [results] = await salaModel.all();
    res.json({ success: true, results: results });
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
};


// SALA POR ID
exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await salaModel.find(id);
    if (result == null) {
      res.status(404).json({ succsess: false, message: "La sala no existe" });
    } else {
      res.json({ succsess: true, result });
    }
  } catch (error) {}
};



// TODO:
// - HABILITAR O DESHABiLITAR ESPACIO PUNTUAL


// HACER O QUITAR PRIVILEGIO ADMIN