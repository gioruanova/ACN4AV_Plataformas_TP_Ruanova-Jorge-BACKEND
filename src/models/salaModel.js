const connection = require("../../db");


// MOSTRAR TODAS LAS SALAS
exports.all = async () => {
  const query = "SELECT * FROM listadosalas";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

// MOSTRAR SALA POR ID PUNTUAL
exports.find = async (id) => {
  const query = "SELECT * FROM listadosalas WHERE id = ?";

  try {
    [results] = await connection.query(query, [id]);
    return results.length == 1 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};



// DESHABILITAR SALA
exports.updateDeshabilitar = async ({ id }) => {
  const query =
    "UPDATE listadosalas SET habilitado = 0 WHERE sala_id = ?";

  try {
    const [result] = await connection.query(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error(`No se pudo deshhabilitar  la sala con ID ${id}.`);
    }
  } catch (error) {
    throw error; 
  }
};


// HABILITAR SALA
exports.updateHabilitar = async ({ id }) => {
  const query =
    "UPDATE listadosalas SET habilitado = 1 WHERE sala_id = ?";

  try {
    const [result] = await connection.query(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error(`No se pudo habilitar la sala con ID ${id}.`);
    }
  } catch (error) {
    throw error; 
  }
};


// QUITAR DESTACADO SALA
exports.updateQuitarDestacado = async ({ id }) => {
  const query =
    "UPDATE listadosalas SET destacado = 0 WHERE sala_id = ?";

  try {
    const [result] = await connection.query(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error(`No se pudo quitar el destacado  la sala con ID ${id}.`);
    }
  } catch (error) {
    throw error; 
  }
};


// DESTACAR SALA
exports.updateAgregarDestacado = async ({ id }) => {
  const query =
    "UPDATE listadosalas SET destacado = 1 WHERE sala_id = ?";

  try {
    const [result] = await connection.query(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error(`No se pudo agregar el destacado la sala con ID ${id}.`);
    }
  } catch (error) {
    throw error; 
  }
};
