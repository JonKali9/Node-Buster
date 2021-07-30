const mysql = require('mysql2');
require('dotenv').config();

db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: process.env.SQL_PASSWORD,
    database: 'nodebuster'
});

module.exports = db;