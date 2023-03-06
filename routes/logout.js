// import modules
var express = require('express');
var router = express.Router();


/* GET home page. */
/////////////////////////////////////////////
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
      // disable the login token
      req.session.loggedin = false;
      res.render('index', { title: 'You have logged out'});
      res.end()

  }else{
    req.session.loggedin = false;
    res.render('index', { title: 'Signin or login'})
  }
  
});

module.exports = router;