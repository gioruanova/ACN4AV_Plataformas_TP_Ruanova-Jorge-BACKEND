const connection = require("../../db");

exports.all = async () => {
  const query = "SELECT horario FROM rangoshorarios";

  try {
    results = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

