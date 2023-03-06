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
  var email = req.body.email;
  var password = req.body.password;

  // check if email and password were submitted
  if(email && password){

      // fetch user record from db matching email and password
      connection.query("SELECT * FROM login_users WHERE email = ? AND password = ? ", [email, password], function(error, results, fields){

        if(results.length > 0){
            
            // if "accstatus" is "on" in DB set login to true"
            if(results[0].accstatus == "on") {
              req.session.loggedin = true;
              req.session.email = email;
              res.redirect("/home");

             // if accstatus is not "on" verify email
            }else if(results[0].accstatus != "on"){
              res.render( 'auth', {title: 'Verify your email to login'});
              res.end()

            // or inform user of incorrect login details
            }else{
              res.render( 'auth', {title: 'Incorrect login details'});
              res.end()
            }
        }else{
          res.render( 'index', {title: 'Create account to login'});
          res.end();
        }
      });

  } else{
      res.send('Please enter Username and Password');
      res.end();
    }
})
module.exports = router;
