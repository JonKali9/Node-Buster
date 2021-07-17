const mysql = require('mysql2');

db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'nodebuster'
});

module.exports = db;