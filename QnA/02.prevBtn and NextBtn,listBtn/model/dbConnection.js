const mysql = require('mysql');
const pool = mysql.createPool({
    host : '127.0.0.1',
    port : 3306,
    database : 'reservation',
    user : 'root',
    password : 'your password',
    //connectionLimit:1,
    multipleStatements: true
   //waitForConnections:false
});

module.exports = pool;
