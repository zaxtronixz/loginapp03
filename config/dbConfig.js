
// database connection configuration
///////////////////////////////////
var mysql = require('mysql');



/// MySQL DB connection
///////////////////////////////
 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'loginapp-db'
});




module.exports = connection ;

