var LocalStrategy = require('passport-local').Strategy
  , foodieDB = require('./db')
  , db = new foodieDB();
  ;

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (user, done) {
    new db.User()
      .where({username: user})
      .fetch()
      .then(function (user) {
        done(null, user);
      })
      .catch(function (error) {
        done(error);
      })
    ;
  });

  passport.use('register',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      new db.User()
        .where({username: username})
        .fetch()
        .then(function (model) {
          if (model) {
            return done(null, false);
          }
          else {
            new db.User({
              username: username,
              email: req.body.email,
              password: this.generateHash(password)
            })
            .save()
            .then(function (newUser) {
              return done(null, newUser);
            })
            .catch(function (error) {
              return done(error);
            })
          }
        })
        .catch(function (error) {
          return done(error);
        })
      ;
    })
  );

  passport.use('login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      new db.User()
        .where({username: username})
        .fetch()
        .then(function (model) {
          if (!model) {
            return done(null, false);
          }
          if (!model.validPassword(password)) {
            return done(null, false);
          }
          else {
            return done(null, model);
          }
        })
        .catch(function (error) {
          return done(error);
        })
      ;
    })
  );

}