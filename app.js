//make required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');
var mongoose = require('mongoose');
var { db } = require('./config/database');
console.log("db in app.js ", db);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/toDos');
var moviesRouter = require('./routes/movies');
var directorsRouter = require('./routes/directors');
let auth = require('./middleware/auth');

//build express framework
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // use view engine called pug

//middlewares 
//create own middleware myLogger and requestTime
const myLogger = function(req, res, next) {
  console.log("LOGGED by us ", req.url);
  next();
}
app.use(myLogger);

const requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
}
app.use(requestTime);
//work in order
// app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
.catch(err => console.log("Error   ", err));

//register routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todos', auth.verifyUserToken, todosRouter);
app.use('/api/movies', auth.verifyUserToken, moviesRouter);
app.use('/api/directors', auth.verifyUserToken, directorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
