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
              .onDelete('CASCADE')
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
    return bcrypt.compareSync(password, this.get('password'));
  },
  trucks: function () {
    return this.hasMany(new DB().Truck, 'users_id');
  }
});

DB.prototype.Truck = bookshelf.Model.extend({
  tableName: 'truck',
  idAttribute: 'truck_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id');
  },
  menu: function () {
    return this.hasOne(new DB().Menu, 'truck_id')
  },
  menus: function () {
    return this.hasMany(new DB().Menu, 'truck_id')
  }
});

DB.prototype.CurrentLocation = bookshelf.Model.extend({
  tableName: 'current_location',
  idAttribute: 'current_location_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id')
      .through(new DB().Truck, 'truck_id');
  },
  truck: function () {
    return this.belongsTo(new DB().Truck, 'truck_id');
  }
});

DB.prototype.FutureLocation = bookshelf.Model.extend({
  tableName: 'future_location',
  idAttribute: 'future_location_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id')
      .through(new DB().Truck, 'truck_id');
  },
  truck: function () {
    return this.belongsTo(new DB().Truck, 'truck_id');
  }
});

DB.prototype.Route = bookshelf.Model.extend({
  tableName: 'route',
  idAttribute: 'route_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id')
      .through(new DB().Truck, 'truck_id');
  },
  truck: function () {
    return this.belongsTo(new DB().Truck, 'truck_id');
  }
});

DB.prototype.Menu = bookshelf.Model.extend({
  tableName: 'menu',
  idAttribute: 'menu_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id')
      .through(new DB().Truck, 'truck_id');
  },
  truck: function () {
    return this.belongsTo(new DB().Truck, 'truck_id');
  }
});

DB.prototype.Priority = bookshelf.Model.extend({
  tableName: 'priority',
  idAttribute: 'priority_id',
  user: function () {
    return this.belongsTo(new DB().User, 'users_id')
      .through(new DB().Truck, 'truck_id');
  },
  truck: function () {
    return this.belongsTo(new DB().Truck, 'truck_id');
  }
});

DB.prototype.Specials = bookshelf.Model.extend({
  tableName: 'specials',
  idAttribute: 'specials_id'
});

DB.prototype.getTable = function (table) {
  var orm;
  switch (table) {
    case 'users':
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
  }
  return orm;
}

DB.prototype.create = function (c, done) {
  var model, _model;

  model = this.getTable(c.table);
  _model = this.getTable(c.lookup);

  if (c.user_id && !c.relation && !c.lookup) {
    new model(c.where).fetch()
      .then(function (m) {
        if (m) return done(new Error());
        c.body.users_id = c.user_id;
        new model(c.body).save()
          .then(function (n) { return done(null, n); })
          .catch(function (r) { return done(r); })
      })
      .catch(function (e) {
        return done(e);
      })
    ;
  }
  else {
    new _model(c.where).fetch({ withRelated: c.relation })
      .then(function (m) {
        if (!c.isAuthenticated(m)) return done(new Error());
        new model(c.body).save()
          .then(function (n) { return done(null, n); })
          .catch(function (r) { return done(r); })
      })
      .catch(function (e) {
        return done(e);
      })
    ;
  }

}

DB.prototype.read = function (c, done) {
  var model;

  if (c.lookup) {
    model = this.getTable(c.lookup);

    function successLookup (m) {
      m.related(c.relation).fetch()
        .then(function (a) {
          if (!a) return done(new Error());
          if (c.selectorKey && c.selectorValue) {
            if (a.get('title') !== c.selectorValue) {
              return done(new Error());
            }
          }
          return done(null, a);
        })
        .catch(function (b) {
          return done(b);
        })
      ;
    }

    function errorLookup (e) {
      return done(e);
    }

    new model(c.where).fetch().then(successLookup).catch(errorLookup);

  }
  else {
    model = this.getTable(c.table);
    if (c.where) {
      model = new model().where(c.where).fetch();
    }
    else {
      model = new model().fetchAll();
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
}

DB.prototype.update = function (c, done) {
  var model = this.getTable(c.table);

  if (c.user_id) {
    new model(c.where).fetch({ withRelated: c.related })
      .then(function (m) {
        if (m.relations.user.get('users_id') !== c.user_id) {
          return done(new Error());
        }
        if (m.relations.truck.get('name') !== c.truck) {
          return done(new Error());
        }
        m.save(c.body, { method: 'update' })
          .then(function (s) {
            return done(null, s);
          })
          .catch(function (e) {
            return done(e);
          })
        ;
      })
      .catch(function (e) {
        return done(e);
      })
    ;
  }
  else {
    new model().where(c.where)
      .save(c.body, { method: 'update' })
      .then(function (data) {
        return done(null, data);
      })
      .catch(function (error) {
        return done(error);
      })
    ;
  }

}

DB.prototype.delete = function (c, done) {
  var model = this.getTable(c.table);

  if (c.related) {
    new model(c.where).fetch({ withRelated: c.related })
      .then(function (m) {
        if (m.relations.user.get('users_id') !== c.user_id) {
          return done(new Error());
        }
        if (m.relations.truck.get('name') !== c.truck) {
          return done(new Error());
        }
        m.destroy();
        return done();
      })
      .catch(function (e) {
        return done(e);
      })
    ;
  }
  else {
    new model().where(c.where).fetch()
      .then(function (data) {
        data.destroy();
        return done();
      })
      .catch(function (error) {
        return done(error);
      })
    ;
  }
}

module.exports = DB;