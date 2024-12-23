const connection = require("../../db");

exports.all = async () => {
  const query = "SELECT * FROM listadosalas";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.find = async (id) => {
  const query = "SELECT * FROM listadosalas WHERE id = ?";

  try {
    [results] = await connection.query(query, [id]);
    return results.length == 1 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};
