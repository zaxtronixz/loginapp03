// import modules
var express = require('express');
var router = express.Router();


/* GET home page. */
/////////////////////////////////////////////
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
      res.render('dashb');
  }else{
    res.render('index', { title: 'You are not logged in'})
  }
  
});

module.exports = router;


