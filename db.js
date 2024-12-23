const mysql = require('mysql2/promise');

const pool = mysql.createPool({
host : 'localhost',
user: 'root',
password: '',
port: 3307,
database: 'central-reservas',
waitForConnection: true,
connectionLimit: 10,
queueLimit : 0

});

module.exports = pool;