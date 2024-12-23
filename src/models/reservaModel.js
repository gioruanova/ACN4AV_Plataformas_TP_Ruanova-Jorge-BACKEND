const connection = require("../../db");

// TODAS LAS RESERVAS
exports.all = async () => {
  const query = "SELECT * FROM listadoreservas";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

// SALA POR RESERVA ID
exports.find = async (id) => {
  const query = "SELECT * FROM listadoreservas WHERE reserva_id = ?";

  try {
    [results] = await connection.query(query, [id]);
    return results.length == 1 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

// SALA POR ID DE USUARIO
exports.findByUser = async (id) => {
  const query = "SELECT * FROM listadoReservas WHERE usuario_id = ?";

  try {
    const [results] = await connection.query(query, [id]);
    return results;
  } catch (error) {
    throw error;
  }
};
