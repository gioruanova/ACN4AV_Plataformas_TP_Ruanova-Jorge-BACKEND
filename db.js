const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,  // Cambiado de DB_HOST a MYSQLHOST
  user: process.env.MYSQLUSER,  // Cambiado de DB_USER a MYSQLUSER
  password: process.env.MYSQLPASSWORD,  // Cambiado de DB_PASSWORD a MYSQLPASSWORD
  database: process.env.MYSQLDATABASE,  // Cambiado de DB_NAME a MYSQLDATABASE
  port: process.env.MYSQLPORT || 3306,  // Cambiado de DB_PORT a MYSQLPORT
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
