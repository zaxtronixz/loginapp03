var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var session = require('./config/session'); // import session config

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var homeRoute = require('./routes/home');
var newaccRoute = require('./routes/newacc');
var sendmailRoute = require('./routes/sendmail');
var verifyRoute = require('./routes/verify');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// use session configuration
app.use(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/home', homeRoute);
app.use('/newacc', newaccRoute);
app.use('/sendmail', sendmailRoute);
app.use('/verify/', verifyRoute);






//////////////////////////////////////////////////////////////////////////////////////////////////////


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
