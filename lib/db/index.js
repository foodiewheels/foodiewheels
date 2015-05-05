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

DB.prototype.create = function (c, done) {
  var model =  this._helpers.getTable(c.table);
  new model.where(c.where)
    .fetch()
    .then(function (model) {
      if (model) return done(new Error());
      new model(c.body)
        .save()
        .then(function (newModel) {
          return done(null, newModel);
        })
        .catch(function (error) {
          return done(error);
        })
      ;
    })
    .catch(function (error) {
      return done(error);
    })
  ;
}

DB.prototype.read = function (c, done) {
  var model = this._helpers.getTable(c.table);
  if (c.where) {
    model = new model.where(c.where).fetch();
  }
  else {
    model = model.fetchAll();
  }
  model
    .then(function (data) {
      if (!data) return done(new Error());
      else return done(null, data);
    })
    .catch(function (error) {
      return done(error);
    })
  ;
}

DB.prototype.update = function (c, data) {
  var model = this._helpers.getTable(c.table);
  new model.where(c.where)
    .save(c.body, {method: 'update'})
    .then(function (data) {
      return done(null, data);
    })
    .catch(function (error) {
      return done(error);
    })
  ;
}

DB.prototype.delete = function (c, done) {
  var model = this._helpers.getTable(c.table);
  new model.where(c.where)
    .fetch()
    .then(function (data) {
      data.destroy();
      return done();
    })
    .catch(function (error) {
      return done(error);
    })
  ;
}

DB.prototype.User = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'users_id',
  generateHash: function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword: function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  }
});

DB.prototype.Truck = bookshelf.Model.extend({
  tableName: 'truck',
  idAttribute: 'truck_id'
});

DB.prototype.CurrentLocation = bookshelf.Model.extend({
  tableName: 'current_location',
  idAttribute: 'current_location_id'
});

DB.prototype.FutureLocation = bookshelf.Model.extend({
  tableName: 'future_location',
  idAttribute: 'future_location_id'
});

DB.prototype.Route = bookshelf.Model.extend({
  tableName: 'route',
  idAttribute: 'route_id'
});

DB.prototype.Menu = bookshelf.Model.extend({
  tableName: 'menu',
  idAttribute: 'menu_id'
});

DB.prototype.Priority = bookshelf.Model.extend({
  tableName: 'priority',
  idAttribute: 'priority_id'
});

DB.prototype.Specials = bookshelf.Model.extend({
  tableName: 'specials',
  idAttribute: 'specials_id'
});

DB.prototype._helpers = function () {
  return {
    getTable: function (table) {
      var orm;
      switch (table) {
        case 'user':
          orm = this.User;
          break;
        case 'truck':
          orm = this.Truck;
          break;
        case 'currentLocation':
          orm = this.CurrentLocation;
          break;
        case 'futureLocation':
          orm = this.FutureLocation;
          break;
        case 'route':
          orm = this.Route;
          break;
        case 'menu':
          orm = this.Menu;
          break;
        case 'priority':
          orm = this.Priority;
          break;
        case 'specials':
          orm = this.Specials;
          break;
        return orm;
      }
    }.bind(this)
  }
}

module.exports = DB;