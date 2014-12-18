"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });

  return User;
};