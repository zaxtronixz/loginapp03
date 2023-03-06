
// database connection configuration
///////////////////////////////////
var mysql = require('mysql');



/// MySQL DB connection
///////////////////////////////
 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'loguser',
  password : '',
  database : 'loginapp_db'
});




module.exports = connection ;

