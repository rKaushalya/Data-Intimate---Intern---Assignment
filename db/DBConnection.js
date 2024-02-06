const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
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