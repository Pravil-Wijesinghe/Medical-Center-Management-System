const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'mediacal_center_management_system'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;


// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: null,
//     database: 'mediacal_center_management_system'
// });

// connection.connect(function(err){
//     if(err){
//         console.log(err.code);
//         console.log(err.fatal);
//     }
// });

// $query = 'SELECT * FROM patient';

// connection.query($query, function(err, rows, fields) {
//     if(err){
//         console.log("An error ocurred performing the query.");
//         return;
//     }

//     console.log("Query succesfully executed: ", rows); 
// });

// connection.end(function(){
//     console.log("Connection closed");
// });


