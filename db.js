const mysql = require('mysql');

const db = mysql.createConnection({
    host: '65.1.86.38',
    user: 'root',
    password: 'new_password',
    database: 'linx'
  });

module.exports = db;
