var mysql = require('promise-mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

mysql.createConnection({
  user: 'root',
  database: 'chat'
}).then(conn => {
  module.exports.connection = conn;
  console.log(module.exports.connection);
}).catch(err => console.log('CONNECTION ERROR:', err));


