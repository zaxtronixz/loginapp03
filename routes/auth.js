/*  import modules */
/////////////////////////////////////////////////
var express = require('express');
var router = express.Router();


/* include db connection */
/////////////////////////////////////////////////
var connection = require('../config/dbConfig');


/* GET home page. */
/////////////////////////////////////////////////
router.get('/', function(req, res, next) {
  res.render( 'auth', {title: 'You need to be authenticated'});
});

/* user authentication */
///////////////////////////////////////////////
router.post('/', function(req, res) {
  
  // collect form variable
  // var session = req.session;
  var username = req.body.username;
  var password = req.body.password;

  // retreive data from DB and login user
  if(username && password){
      connection.query("SELECT * FROM accounts WHERE username = ? and password = ?", [username, password], function(error, results, fields){
      console.log("the result is "+JSON.stringify(results))
      if(results){
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect("/home");
          } else{
             res.render( 'auth', {title: 'Incorrect username or password'});
          }
        res.end()
      }else{
        res.render( 'auth', {title: 'Database connection Error: Check system setup'});
        res.end();
      }
    });

  } else{
      res.send('Please enter Username and Password');
      res.end();
    }
})
module.exports = router;
