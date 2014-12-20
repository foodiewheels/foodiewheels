var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , passport = require('passport')
  , db = require('./db')
  , routes = require('./routes')
  ;

var server = express();
server.set('port', process.env.PORT || 3030);

require('./passport')(passport);

server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '25mb'}));

server.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
server.use(passport.initialize());
server.use(passport.session());

// Login & Logout Routes =======================================================
server.post('/api/v1/login',
  passport.authenticate('login'),
  function (req, res, next) {
    res.send(req.user);
  })
;

server.post('/api/v1/logout',
  function (req, res, next) {

  })
;

// User Routes =================================================================
server.post('/api/v1/users',
  passport.authenticate('register'),
  function (req, res, next) {
    res.send(req.user);
  })
;

server.put('/api/v1/users/:username',
  function (req, res, next) {

  })
;

server.delete('/api/v1/users/:username',
  function (req, res, next) {
    return next();
  }, routes.deleteUser)
;

// Truck Routes ================================================================
server.post('/api/v1/trucks',
  function (req, res, next) {

  })
;

server.put('/api/v1/trucks/:truck',
  function (req, res, next) {

  })
;

server.get('/api/v1/trucks',
  function (req, res, next) {

  })
;

server.get('/api/v1/trucks/:truck',
  function (req, res, next) {

  })
;

server.get('/api/v1/trucks/:user',
  function (req, res, next) {

  })
;

server.del('/api/v1/trucks/:truck',
  function (req, res, next) {

  })
;

// Menu Routes =================================================================
server.post('/api/v1/menus',
  function (req, res, next) {

  })
;

server.put('/api/v1/menus/:menu',
  function (req, res, next) {

  })
;

server.get('/api/v1/menus',
  function (req, res, next) {

  })
;

server.get('/api/v1/menus/:menu',
  function (req, res, next) {

  })
;

server.del('/api/v1/menus/:menu',
  function (req, res, next) {

  })
;

// Geography Routes ============================================================

module.exports = function (done) {
  db.sequelize.sync()
    .then(function () {
      return done(null, server);
    })
    .catch(function (err) {
      return done(err);
    })
  ;
};