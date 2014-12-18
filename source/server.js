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

// POST Routes =================================================================
server.post('/user/register',
  passport.authenticate('register'),
  function (req, res, next) {
    res.send(req.user);
  })
;

server.post('/user/login',
  passport.authenticate('login'),
  function (req, res, next) {
    res.send(req.user);
  })
;

// DELETE Routes ===============================================================
server.delete('/user/:username',
  function (req, res, next) {
    return next();
  }, routes.deleteUser)
;

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