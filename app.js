var createError = require('http-errors');
var express = require('express');
var expressLayouts = require("express-ejs-layouts");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();

const passportConfig = require('./config/passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/admins');

var app = express();

// mongoDB connection
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to database');
});

// Express session
app.use(session({ 
  secret: process.env.SECRET, 
  cookie: { maxAge: 60000 }, 
  resave: false, 
  saveUninitialized: false 
}));

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(expressLayouts);
app.use(cookieParser());
app.use(flash());

// Locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', usersRouter);

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
