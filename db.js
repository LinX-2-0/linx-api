const mysql = require('mysql');

const db = mysql.createConnection({
    host: '13.201.36.2',
    user: 'root',
    password: 'new_password',
    database: 'linx'
  });

module.exports = db;
