const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'StrongPassword123!',
    database: 'linx'
  });

module.exports = db;