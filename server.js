var express = require('express')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , database = require('./database')
  , routes = require('./routes')(database)
  , server = express()
;

server.use(logger());

server.set('port', process.env.PORT || 3030);

server.use(cookieParser('secret'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json({limit: '25mb'}));

require('./passport')(passport);

server.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

server.use(passport.initialize());
server.use(passport.session());

server.enable('trust proxy');

function checkAuthorization (req, res, next) {
  if (req.isAuthenticated && req.user.id) return next();
  else res.status(401).send("Unauthorized request!");
}

// Login & Logout Routes =======================================================
server.post('/api/v1/login',
  passport.authenticate('login'),
  function (req, res, next) {
    res.status(200).end();
  })
;

server.post('/api/v1/logout',
  checkAuthorization,
  function (req, res, next) {
    req.logout();
    res.status(200).end();
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
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.updateUser)
;

server.delete('/api/v1/users/:username',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.deleteUser)
;

// Truck Routes ================================================================
server.post('/api/v1/trucks',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.createTruck)
;

server.put('/api/v1/trucks/:truck',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.updateTruck)
;

server.delete('/api/v1/trucks/:truck',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.deleteTruck)
;

server.get('/api/v1/trucks',
  function (req, res, next) {
    return next();
  }, routes.getTruck)
;

server.get('/api/v1/trucks/:truck',
  function (req, res, next) {
    return next();
  }, routes.getTruck)
;

// Menu Routes =================================================================
server.post('/api/v1/trucks/:truck/menus',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.createMenu)
;

server.put('/api/v1/trucks/:truck/menus/:menu',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.updateMenu)
;

server.delete('/api/v1/trucks/:truck/menus/:menu',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.deleteMenu)
;

server.get('/api/v1/trucks/:truck/menus',
  function (req, res, next) {
    return next();
  }, routes.getMenu)
;

server.get('/api/v1/trucks/:truck/menus/:menu',
  function (req, res, next) {
    return next();
  }, routes.getMenu)
;

// Geography Routes ============================================================
server.post('/api/v1/trucks/:truck/locations',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.createLocation)
;

server.put('/api/v1/trucks/:truck/locations/:location',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.updateLocation)
;

server.delete('/api/v1/trucks/:truck/locations/:location',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.deleteLocation)
;

server.post('/api/v1/trucks/:truck/routes',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.createRoute)
;

server.put('/api/v1/trucks/:truck/routes/:route',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.updateRoute)
;

server.delete('/api/v1/trucks/:truck/routes/:route',
  checkAuthorization,
  function (req, res, next) {
    return next();
  }, routes.deleteRoute)
;

server.get('/api/v1/trucks/locations',
  function (req, res, next) {
    return next();
  }, routes.getLocation)
;

server.get('/api/v1/trucks/:truck/locations',
  function (req, res, next) {
    return next();
  }, routes.getLocation)
;

module.exports = function (callback) {
  callback(server);
}