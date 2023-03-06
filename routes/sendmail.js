/* import modules */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


// config the nodemailer to use gmail
// var transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   service: "Gmail",
//   auth: {
//     user: "zax20yau@gmail.com",
//     pass: "Hiddenfish.0Goo",
//   },
// });

// config the nodemailer to use mailtrap.io
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8b72ebd7315ba7",
    pass: "eeef461fc828d9"
  }
});



/* GET sendmail route. */
/////////////////////////////////////////////
router.get('/', function(req, res, next) {

  // get user data from session
  var email =  req.session.email;
  var firstname = req.session.firstname;
  var lastname = req.session.lastname;

  // concatnate username from session
  var name = firstname + " " + lastname; 

  // create verification token
  var rand=Math.floor((Math.random() * 9000000) + 6000000);
  var host=req.get('host');
  var link="http://"+req.get('host')+"/verify?id="+rand;

  // store verification token in session
    req.session.veritoken = rand;

  // Default email message description
  var message = {

    from: 'zax20yau@yahoo.com' ,

    to: email, //recipient email fetched from session

    subject: 'CiSimulator Email Verification', 

    html: "<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
  }

  // Send the mail using above default email settings
  transport.sendMail(message, function(error){

    // if mail sending fails display error
    if(error){
      console.log('Error occured');
      console.log(error.message);
      res.send(error)
      return;

    // if mail sending succeeds display newacc page with message
    }else{
      res.render( 'auth', {title: 'Kindly click the verification link sent to your email to complete your registration'});
      res.end();
    }
  });

})

module.exports = router;





