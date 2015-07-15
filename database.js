var bcrypt = require('bcrypt-nodejs')
  , config = require('./config.json')
  , knex = require('knex')(config.db)
  , bookshelf = require('bookshelf')(knex)
  , save
  , Users
  , Roles
  , UsersRoles
  , UsersLocations
  , Trucks
  , TrucksHours
  , TrucksLocationsCurrent
  , TrucksLocationsFuture
  , TrucksRoutes
  , Priority
  , TrucksPriority
  , TrucksSpecials
  , Tags
  , TrucksTags
;

save = bookshelf.Model.prototype.save;
bookshelf.Model.prototype.save = function () {
  return save.apply(this, arguments).then(function (model) {
    return model ? model.fetch() : model;
  })
};

Users = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'users_id'
});

Roles = bookshelf.Model.extend({
  tableName: 'roles',
  idAttribute: 'roles_id'
});

UsersRoles = bookshelf.Model.extend({
  tableName: 'users_roles',
  idAttribute: 'users_roles_id'
});

UsersLocations = bookshelf.Model.extend({
  tableName: 'users_locations',
  idAttribute: 'users_locations_id'
});

Trucks = bookshelf.Model.extend({
  tableName: 'trucks',
  idAttribute: 'trucks_id'
});

TrucksHours = bookshelf.Model.extend({
  tableName: 'trucks_hours',
  idAttribute: 'trucks_hours_id'
});

TrucksLocationsCurrent = bookshelf.Model.extend({
  tableName: 'trucks_locations_current',
  idAttribute: 'trucks_locations_current_id'
});

TrucksLocationsFuture = bookshelf.Model.extend({
  tableName: 'trucks_locations_future',
  idAttribute: 'trucks_locations_future_id'
});

TrucksRoutes = bookshelf.Model.extend({
  tableName: 'trucks_routes',
  idAttribute: 'trucks_routes_id'
});

Priority = bookshelf.Model.extend({
  tableName: 'priority',
  idAttribute: 'priority_id'
});

TrucksPriority = bookshelf.Model.extend({
  tableName: 'trucks_priority',
  idAttribute: 'trucks_priority_id'
});

TrucksSpecials = bookshelf.Model.extend({
  tableName: 'trucks_specials',
  idAttribute: 'trucks_specials_id'
});

Tags = bookshelf.Model.extend({
  tableName: 'tags',
  idAttribute: 'tags_id'
});

TrucksTags = bookshelf.Model.extend({
  tableName: 'trucks_tags',
  idAttribute: 'trucks_tags_id'
});

module.exports = {
  'Users': Users,
  'Roles': Roles,
  'UsersRoles': UsersRoles,
  'UsersLocations': UsersLocations,
  'Trucks': Trucks,
  'TrucksHours': TrucksHours,
  'TrucksLocationsCurrent': TrucksLocationsCurrent,
  'TrucksLocationsFuture': TrucksLocationsFuture,
  'TrucksRoutes': TrucksRoutes,
  'Priority': Priority,
  'TrucksPriority': TrucksPriority,
  'TrucksSpecials': TrucksSpecials,
  'Tags': Tags,
  'TrucksTags': TrucksTags
}