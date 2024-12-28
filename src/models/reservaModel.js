const connection = require("../../db");

// =====================================================
// ACCIONES PARA MOSTRAR
// =====================================================

// MOSTRAR TODAS LAS RESERVAS
exports.all = async () => {
  const query = "SELECT * FROM listadoreservas";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

// MOSTRAR RESERVA POR RESERVA ID
exports.find = async (id) => {
  const query = "SELECT * FROM listadoreservas WHERE reserva_id = ?";

  try {
    [results] = await connection.query(query, [id]);
    return results.length == 1 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

// MOSTRAR RESERVA POR ID DE USUARIO
exports.findByUser = async (id) => {
  const query = "SELECT * FROM listadoReservas WHERE usuario_id = ?";

  try {
    const [results] = await connection.query(query, [id]);
    return results;
  } catch (error) {
    throw error;
  }
};

// =====================================================
// ACCIONES PARA CREAR
// =====================================================

// VALIDADOR DE RESERVA
exports.exists = async ({ sala_id, sala_fecha, sala_hora }) => {
  const query = `
    SELECT COUNT(*) AS count
    FROM listadoreservas
    WHERE sala_id = ? AND sala_fecha = ? AND sala_hora = ? AND reserva_estado = 1
  `;

  try {
    const [result] = await connection.query(query, [
      sala_id,
      sala_fecha,
      sala_hora,
    ]);
    return result[0].count > 0; 
  } catch (error) {
    throw error;
  }
};

// CREAR RESERVA ( CON VALIDACION )
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
    throw error;
  }
};

// =====================================================
// ACCIONES MODIFICAR
// =====================================================

// CANCELAR RESERVA ( UPDATE ESTADO )
exports.update = async ({ id }) => {
  const query =
    "UPDATE listadoreservas SET reserva_estado = 0 WHERE reserva_id = ?";

  try {
    const [result] = await connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar la reserva con ID ${id}.`);
    }
  } catch (error) {
    throw error;
  }
};

// RACTIVAR RESERVA ( UPDATE ESTADO )
exports.updateReactivar = async ({ id }) => {
  const query =
    "UPDATE listadoreservas SET reserva_estado = 1 WHERE reserva_id = ?";

  try {
    const [result] = await connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error(`No se pudo actualizar la reserva con ID ${id}.`);
    }
  } catch (error) {
    throw error;
  }
};
