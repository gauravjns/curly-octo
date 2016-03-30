var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');// for session management
var passport= require('passport');// for login
var FacebookStrategy= require('passport-facebook').Strategy;// for facebook loginn
var routes = require('./routes/index');
var apis = require('./routes/api');
var users = require('./routes/users');
var post = require('./routes/post');
var group = require('./routes/group');
var extras = require('./routes/extras');
var app = express();
app.locals.moment = require('moment');
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: "560837214029174",
    clientSecret:"2953eb4f5347eb46f1bf8ea6d2c25d37" ,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, profile);
    });
  }
));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'Secret Key will be changed in production', name: 'somename', resave: true, saveUninitialized: true}));//
app.use(passport.initialize());
app.use(passport.session());

var sess;

app.use('/',routes);
app.use('/',apis);
app.use('/', extras);//'Extra' routes very fixed pages like about, faq, start
app.use('/', post);
app.use('/', group);
app.use('/', users);// this  routes all remaining url to user if not present move to 404 

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    res.redirect('/');
  });

app.use(function(req, res, next) { // catch 404 and forward to error handler
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Catch 404 and show a custom template
/*
app.use(function(req, res, next) {
  res.status(404).render('404');
});
*/

module.exports = app;
