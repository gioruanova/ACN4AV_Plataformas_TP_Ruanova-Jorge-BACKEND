const salaModel = require("../models/salaModel");

// TRAER TODAS LAS SALAS
exports.index = async (req, res) => {
  try {
    [results] = await salaModel.all();
    const booleanResults = results.map((sala) => ({
      ...sala,
      apta_proyector: Boolean(sala.apta_proyector),
      destacado: Boolean(sala.destacado),
      habilitado: Boolean(sala.habilitado),
    }));
    res.json({ success: true, results: booleanResults });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en conexión" });
  }
};

// SALA POR ID
exports.show = async (req, res) => {
  const { id } = req.params;

  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return res.status(400).json({ success: false, message: "ID inválido" });
  }

  try {
    const result = await salaModel.find(numericId);

    if (result == null) {
      return res.status(404).json({ success: false, message: "La sala no existe" });
    } else {
      return res.json({ success: true, result });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};



// DESHABILITAR SALA
exports.updateDeshabilitar = async (req, res) => {
  const { id } = req.params;
  const { habilitado } = req.body;

  try {
    await salaModel.updateDeshabilitar({ habilitado, id });

    res.json({ success: true, message: "Sala deshabilitada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al deshabilitar la sala" });
  }
};

// HABILITAR SALA
exports.updateHabilitar = async (req, res) => {
  const { id } = req.params;
  const { habilitado } = req.body;

  try {
    await salaModel.updateHabilitar({ habilitado, id });

    res.json({ success: true, message: "Sala habilitada éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al habilitar la sala" });
  }
};

// QUITAR SALA DESTACADA
exports.updateQuitarDestacado = async (req, res) => {
  const { id } = req.params;
  const { destacado } = req.body;

  try {
    await salaModel.updateQuitarDestacado({ destacado, id });

    res.json({
      success: true,
      message: "Sala quitado el tag de destacado con éxito",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al quitar destacado la sala" });
  }
};

// AGREGAR SALA DESTACADA
exports.updateAgregarDestacado = async (req, res) => {
  const { id } = req.params;
  const { destacado } = req.body;

  try {
    await salaModel.updateAgregarDestacado({ destacado, id });

    res.json({
      success: true,
      message: "Sala agregado el tag de destacado con éxito",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al destacar la sala" });
  }
};
