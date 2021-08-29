/* configure app session  */
/////////////////////
var session = require('express-session');


//////////////////////////////////////////////////////////////////////////////////////////////////////
/// configure Application Session
/////////////////////////////////////////
var set_session = session({
  secret: 'incredible-session97210jcw@#%ndfnagjk',
  resave: true,
  saveUninitialized: true
});


module.exports = set_session;




