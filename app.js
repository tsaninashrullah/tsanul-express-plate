var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
require('dotenv').config()
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tes-node')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// app.use(function(err, req, res, next) {
//   console.error(err.stack)
//   next(err)
// })
// app.use(function(err, req, res, next) {
//   console.log(req)
//   if (req.ajax) {
//     res.status(500).json({ error: 'Something failed!' })
//   } else {
//     next(err)
//   }
// })
// app.use(function(err, req, res, next) {
//   res.status(500)
//   res.render('error', { error: err })
// })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(function(err, req, res, next) {
  next(err)
})

app.use('/', indexRouter);
app.use('/api/v1/users', function(req, res, next){
  next({'isApi' : true})
},  usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.isApi) {
    var responseError = {
      "result" : "failed",
      "code" : 500,
      "message" : "something went wrong, please contact our admin!",
      "data" : {}
    }
    res.status(500).json(responseError)
  } else {
    // set locals, only providing error in development
    res.locals.message = (err.status == 404) ? 'EWEUH PAGE NA' : err.message ;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

console.log('Build success')
module.exports = app;
