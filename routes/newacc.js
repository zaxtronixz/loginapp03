/* import modules */
var express = require('express');
var router = express.Router();



/* include db connection */
/////////////////////////////////////////////////
var conn = require('../config/dbConfig');


/* GET home page. */
/////////////////////////////////////////////
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
      res.render('dashb');
  }else{
    res.render('newacc', { remark: 'Create your account'})
  }
});

// check for duplicate email acc
var stmt1 = `SELECT * FROM login_users WHERE email = ?`

// insert new user profile
var stmt = `INSERT INTO login_users (firstname, lastname, password, email, accstatus) VALUES (?,?,?,?,?) `;

/* post profile form. */
//////////////////////////////////////////////
router.post('/', function(req, res, next){

    // fetch form data
    var formData = [
      req.body.firstname //0
      ,req.body.lastname //1
      ,req.body.password //2
      ,req.body.email    //3
      ,"off"]            //4

     // check if form data are complete
    if(formData.length >= 4){

      // check for email duplicate in DB
      conn.query(stmt1, formData[3], function(err, data){
         
         // check if returned data from db query is true
         if(Object.keys(data).length > 0){
              res.render( 'newacc', {remark: 'This user already exist'});
              res.end();

         }else{
              // insert data into the DB
              conn.query(stmt, formData, function(error, results, fields){
                
                // check if data stored in db was sucessful
                if(Object.keys(results).length > 0){
                  
                  // store user data in session 
                  req.session.email = formData[3];
                  req.session.firstname = formData[0];
                  req.session.lastname = formData[1];

                  // trigger the sendmail route
                  res.redirect( '/sendmail');
                  res.end();

                }else{
                  // return user to account creation page
                  res.render( 'newacc', {remark: 'Could not create account: '});
                  res.end();
                }
              })

         }
      })

    }else{
            res.render( 'newacc', {remark: 'Enter correct information'});
            res.end();
    }
  })// close router.post


module.exports = router;