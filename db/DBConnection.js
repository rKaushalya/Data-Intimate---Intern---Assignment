const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'data_intimate'
});

connection.connect(function (error) {
    if (error){
        throw error;
    }else {
        console.log("MYSQL Database connected Successfully.!");
    }
});

module.exports = connection;