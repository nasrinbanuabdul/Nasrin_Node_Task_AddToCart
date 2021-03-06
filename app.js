var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nasrin');
let connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
 res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
 //res.header('content-type: application/json; charset=utf-8');
 next();
});
var enableCORS = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');

 // intercept OPTIONS method
 if ('OPTIONS' == req.method) {
   res.send(200);
 } else {
   next();
 };
};
app.use(enableCORS);
// app.use('/xx', index);
app.use('/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000);

module.exports = app;
