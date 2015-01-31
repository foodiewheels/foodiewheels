'use strict';

var fs = require('fs')
  , path = require('path')
  , Sequelize = require('sequelize')
  , config = require(__dirname + '/../../config.json')
  , sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config)
  ;

function db () {
  var self = this;
  self.init(arguments[0]);
}

db.prototype.init = function (options) {
  var self = this
    , i
    , models
    ;

  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.js') > -1) && (file !== 'index.js');
    })
    .forEach(function (file) {
      var model = sequelize['import'](path.join(__dirname, file));
      self[model.name] = model;
    })
  ;

  models = Object.keys(self);

  for (i = 0; i < models.length; i++) {
    if ('associate' in self[models[i]])
      self[models[i]].associate(self);
  }
}

db.prototype.getModel = function (table) {
  var self = this
    , i
    , models
    ;

  models = Object.keys(self);

  for (i = 0; i < models.length; i++) {
    if (models[i] === table)
      return self[models[i]];
  }

  return null;
}

db.prototype.create = function (table, callback, options) {
  var self = this
    , model
    ;

  model = self.getModel(table);
  model
    .find(options.where)
    .then(function (record) {
      if (record) callback('error');
      model
        .create(options.data)
        .then(function (done) {
          callback(null, 'success');
        })
        .catch(function (err) {
          callback('error');
        })
      ;
    })
    .catch(function (err) {
      callback('error');
    })
  ;
}

db.prototype.read = function (options) {
  var self = this
    , finder
    , model
    ;

  if (options.where) {
    finder = find(options.where);
  }
  else {
    finder = findAll();
  }

  model = self.getModel(table);
  model
    .find(options.where)
    .then(function (record) {
      callback(null, record);
    })
    .catch(function (err) {
      callback('error');
    })
  ;
}

db.prototype.update = function (table, callback, options) {
  var self = this
    , model
    ;

  model = self.getModel(table);
  model
    .update(options.data, options.where)
    .then(function (record) {
      callback(null, 'success');
    })
    .catch(function (err) {
      callback('error');
    })
  ;
}

db.prototype.delete = function (table, callback, options) {
  var self = this
    , model
    ;

  model = self.getModel(table);
  model
    .find(options.where)
    .then(function (record) {
      record
        .destroy()
        .then(function (done) {
          callback(null, 'success');
        })
        .catch(function (err) {
          callback('error');
        })
      ;
    })
    .catch(function (err) {
      callback('error');
    })
  ;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;