const connection = require("../../db");

const bcrypt = require("bcrypt");

exports.register = async ({
  dni,
  password,
  nombre,
  apellido,
  email,
  isAdmin,
}) => {
  const password_crypt = await bcrypt.hash(password, 10);

  const query = `
INSERT INTO usuarios (dni, password, nombre, apellido, email, isAdmin)
VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await connection.query(query, [
      dni,
      password_crypt,
      nombre,
      apellido,
      email,
      isAdmin ? 1 : 0,
    ]);
  } catch (error) {
    throw error;
  }
};

exports.login = async ({ email, password }) => {
  const query = `SELECT * FROM usuarios WHERE email = ?`;

  try {
    [results] = await connection.query(query, [email]);
    if (results.length == 1) {
      const usuario = results[0];

      const is_password = await bcrypt.compare(password, usuario.password);

      return is_password ? usuario : null;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// QUITAR PRIVILEGIOS DE ADMIN
exports.updateQuitarAdmin = async ({ id }) => {
  const query = "UPDATE usuarios SET isAdmin = 0 WHERE id_usuario = ?";

  try {
    const [result] = await connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error(`Error al gestionar usuario ID ${id}.`);
    }
  } catch (error) {
    throw error;
  }
};

// QUITAR PRIVILEGIOS DE ADMIN
exports.updateAgregarAdmin = async ({ id }) => {
  const query = "UPDATE usuarios SET isAdmin = 1 WHERE id_usuario = ?";

  try {
    const [result] = await connection.query(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error(`Error al gestionar usuario ID ${id}.`);
    }
  } catch (error) {
    throw error;
  }
};

// MOSTRAR TODOS LOS USUARIOS
exports.all = async () => {
  const query = "SELECT * FROM usuarios";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};
