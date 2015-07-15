var localStrategy = require('passport-local').Strategy
  , db = require('./database')
;

function authenticate (passport) {

  function register (req, username, password, callback) {
    new db.Users({ username: username }).fetch()
      .then(function (model) {
        if (model) return callback(new Error("User exists!"));

        var data = {
          username: username,
          email: req.body.email,
          password: this.generateHash(password)
        };

        new db.Users(data).save()
          .then(function (user) {

            var users_id = user.get('users_id');

            new db.UsersPreferences({ users_id: users_id }).save()
              .then(function (preferences) {
                return callback(null, user);
              })
              .catch(function (error) {
                return callback(error);
              })
            ;

          })
          .catch(function (error) {
            return callback(error);
          })
        ;

      })
      .catch(function (error) {
        return callback(error);
      })
    ;
  };

  function login (req, username, password, callback) {
    new db.Users({ username: username }).fetch()
      .then(function (model) {
        if (!model) {
          return callback(null, new Error("User doesn't exist!"));
        }
        if (!model.validPassword(password)) {
          return callback(null, new Error("Password incorrect!"));
        }
        return callback(null, model);
      })
      .catch(function (error) {
        return callback(error);
      })
    ;
  };

  passport.serializeUser(function (user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function (usersId, callback) {
    new db.Users({ users_id: usersId }).fetch()
      .then(function (user) { callback(null, user); })
      .catch(function (error) { callback(error); })
    ;
  });

  passport.use('register',
    new localStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, register)
  );

  passport.use('login',
    new localStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, login)
  );

};

module.exports = authenticate;