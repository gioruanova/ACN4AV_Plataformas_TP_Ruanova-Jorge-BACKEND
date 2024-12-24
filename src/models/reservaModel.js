const connection = require("../../db");

const { formatToday } = require("../helpers/dataHelper");

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

// RESERVA POR RESERVA ID
exports.find = async (id) => {
  const query = "SELECT * FROM listadoreservas WHERE reserva_id = ?";

  try {
    [results] = await connection.query(query, [id]);
    return results.length == 1 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

// RESERVA POR ID DE USUARIO
exports.findByUser = async (id) => {
  const query = "SELECT * FROM listadoReservas WHERE usuario_id = ?";

  try {
    const [results] = await connection.query(query, [id]);
    return results;
  } catch (error) {
    throw error;
  }
};

// -----------------------------------
// CREAR RESERVA
// -----------------------------------

exports.create = async ({
  sala_id,
  sala_fecha,
  sala_hora,
  usuario_id,
  reserva_estado,
}) => {
  const query =
    "INSERT INTO listadoreservas (sala_id, sala_fecha, sala_hora, usuario_id, reserva_estado) VALUES (?,?,?,?,?)";

  try {
    await connection.query(query, [
      sala_id,
      sala_fecha,
      sala_hora,
      usuario_id,
      reserva_estado,
    ]);
  } catch (error) {
    console.log(query);
    throw error;

  }
};
