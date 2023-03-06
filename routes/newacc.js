/* import modules */
var express = require('express');
var router = express.Router();
const mysql = require('mysql');



/* include db connection */
/////////////////////////////////////////////////
// var connection = require('../config/dbConfig');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'loguser',
  password: '',
  database: 'loginapp_db'
});

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
var stm1 = `SELECT * FROM users WHERE email = ?`

// insert new user profile
var stm = `INSERT INTO users (firstname, lastname, password, email, accstatus) VALUES (?,?,?,?,?) `;

// establish database connection and checking for errors first
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database successfully!');
  }
});

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
      connection.query(stm1, [formData[3]], function(err, data){
        console.log("This error message was discovered "+err)
        
        // check error in connection first
        if (err){

              // display response for error
              res.render( 'newacc', {remark: 'database connection error '+ err});
              return;
        }else{

             // check if returned data from db query is true
             if(Object.keys(data).length > 0){
                  res.render( 'newacc', {remark: 'This user already exist'});
                  return;
                  // res.end();

             }else{
                  // insert data into the DB
                  connection.query(stm, formData, function(error, results, fields){
                    
                    // check if data stored in db was sucessful
                    if(Object.keys(results).length > 0){
                      
                      // store user data in session 
                      req.session.email = formData[3];
                      req.session.firstname = formData[0];
                      req.session.lastname = formData[1];

                      // trigger the sendmail route
                      res.redirect( '/sendmail');
                      return;
                      // res.end();

                      }else{
                        // return user to account creation page
                        res.render( 'newacc', {remark: 'Could not create account: '});
                        return;
                        // res.end();
                      }
                  })
             }
        }
      })

    }else{
            res.render( 'newacc', {remark: 'Enter correct information'});
            return;
            // res.end();
    }
  })// close router.post


module.exports = router;