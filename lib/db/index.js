var bcrypt = require('bcrypt-nodejs')
  , config = require('../../config')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , _ = require('lodash')
  , sequence = require('when/sequence')
  , schema = require('./schema')
;

function DB () {
  this.init(arguments[0]);
}

DB.prototype.init = function () {
  this.schema = schema;
}

DB.prototype.createTable = function (table) {
  var self = this;

  knex.schema.hasTable(table).then(function (exists) {
    if (!exists) {
      return knex.schema.createTable(table, function (t) {
        var column
          , keys
        ;

        keys = _.keys(self.schema[table]);

        _.each(keys, function (k) {
          var tableK = self.schema[table][k]
            , reference
          ;

          if (tableK.type === 'string' && tableK.hasOwnProperty('maxlength')) {
            column = t[tableK.type](k, tableK.maxlength);
          }
          else if (tableK.type === 'decimal'
            && tableK.hasOwnProperty('precision')
            && tableK.hasOwnProperty('scale')) {
              column = t[tableK.type](k, tableK.precision, tableK.scale);
          }
          else if (tableK.type === 'linestring') {
            column = t.specificType(k, knex.raw('geography(LINESTRING,4326)'));
          }
          else if (tableK.type === 'point') {
            column = t.specificType(k, knex.raw('geography(POINT,4326)'));
          }
          else {
            column = t[tableK.type](k);
          }

          if (tableK.hasOwnProperty('primary') && tableK.primary === true) {
            column.primary();
          }

          if (tableK.hasOwnProperty('nullable') && tableK.nullable === true) {
            column.nullable();
          }
          else {
            column.notNullable();
          }

          if (tableK.hasOwnProperty('unsigned') && tableK.unsigned === true) {
            column.unsigned();
          }

          if (tableK.hasOwnProperty('references')) {
            reference = tableK.references.split('.');
            column
              .references(reference[1])
              .inTable(reference[0])
            ;
          }
        });
      });
    }
  });
}

DB.prototype.sync = function () {
  var self
    , tables
    , names
  ;

  self = this;
  names = _.keys(self.schema);
  tables = _.map(names, function (name) {
    return function () {
      return self.createTable(name);
    };
  });
  return sequence(tables)
}

DB.prototype.User = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'users_id',
  generateHash: function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  }
});

module.exports = DB;