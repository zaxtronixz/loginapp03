// import modules
var express = require('express');
var router = express.Router();

/* Include db connection */
/////////////////////////////////////////////////
var conn = require('../config/dbConfig');

// Db query
var stmt =  `UPDATE login_users SET accstatus = 'on' WHERE email = ? ;`

/* Verify email and activate account. */
/////////////////////////////////////////////
router.get('/', function(req, res, next) {

  // Get data from session
  var veritoken = req.session.veritoken
  var email = req.session.email

  // Check if token matches id from verification link
  if(req.query.id == veritoken){

    // Activate user account on DB 
    conn.query(stmt, email, function(err, data){
      if (err) {
        console.log(err.message)
      }else if(data.length > 0){
        console.log(" The acccount activation was successful ")

        // Inform user of successful account creation
        res.render('index', { title: 'Your email ' + email+ ' is verified you can now login'});
      }
    })
  }else{
    
    // Revert to landing page & inform user of verification failure
    res.render('index', { title: "Your email verification failed please try again"})
  }
  
});


/////// Send verification form /////////////////////////////
router.get('/veriform', function(req, res, next) {
    // display verification form


})


/////// Send verification link /////////////////////////////
router.get('/verilink', function(req, res, next) {
    // display verification fo


})





module.exports = router