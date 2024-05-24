const mysql = require('mysql');

const db = mysql.createConnection({
    host: '172.31.33.19',
    user: 'root',
    password: 'new_password',
    database: 'linx',
    connectionTimeout: 100000
  });

module.exports = db;
