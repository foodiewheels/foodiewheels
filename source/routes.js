var foodieDB = require('./db');

db = new foodieDB();

function updateUsers (req, res, next) {
  var username = req.params.username || username
    , data = req.body || data
    , options = {}
    ;

  options.data = data
  options.where = { "where": { "username": data.username }};

  if (!username) return res.status(500).end();

  db.update('User', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function deleteUsers (req, res, next) {
  var username = req.params.username || username
    , options = {}
    ;

  options.where = { "where": { "username": username }};

  if (!username) return res.status(500).end();

  db.delete('User', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function createTrucks (req, res, next) {
  var data = {
        "name": req.body.name,
        "description": req.body.description,
        "owners": req.body.owners,
        "phone": req.body.phone,
        "email": req.body.email,
        "website": req.body.website,
        "active": req.body.active
      }
    , options = {};
    ;

  options.data = data;
  options.where = { "where": { "name": data.name }};

  if (!data.name) return res.status(500).end();

  db.create('Truck', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function updateTrucks (req, res, next) {
  var truck = req.params.truck || truck
    , data = req.body || data
    , options = {}
    ;

  options.data = data
  options.where = { "where": { "name": truck }};

  if (!truck) return res.status(500).end();

  db.update('Truck', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function deleteTrucks (req, res, next) {
  var truck = req.params.truck || truck
    , options = {}
    ;

  options.where = { "where": { "name": truck }};

  if (!truck) return res.status(500).end();

  db.delete('Truck', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function getTrucks (req, res, next) {

}

function createMenus (req, res, next) {
  var data = {
        "title": req.body.title,
        "description": req.body.description,
        "items": req.body.items
      }
    , options = {}
    ;

  options.data = data;
  options.where = { "where": { "title": data.title }};

  if (!data.title) return res.status(500).end();

  db.create('Menu', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

// Needs a test
function updateMenus (req, res, next) {
  var menu = req.params.menu || menu
    , data = req.body || data
    , options = {}
    ;

  options.data = data
  options.where = { "where": { "title": data.title }};

  if (!menu) return res.status(500).end();

  db.update('Menu', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

// Need two where clauses here, one for the truck and the other
// for the menu
function deleteMenus (req, res, next) {
  var menu = req.params.menu || menu
    , options = {}
    ;

  options.where = { "where": { "name": menu }};

  if (!menu) return res.status(500).end();

  db.delete('Menu', function (err, done) {
    if (err) return res.status(500).end();
    else return res.status(200).end();
  }, options);
}

function getMenus (req, res, next) {

}

function createLocations (req, res, next) {

}

function createRoutes (req, res, next) {

}

function updateRoutes (req, res, next) {

}

function deleteRoutes (req, res, next) {

}

function getLocations (req, res, next) {

}

module.exports = {
  deleteUsers: deleteUsers,
  updateUsers: updateUsers,
  createTrucks: createTrucks,
  updateTrucks: updateTrucks,
  deleteTrucks: deleteTrucks,
  createMenus: createMenus,
  updateMenus: updateMenus,
  deleteMenus: deleteMenus,
  getMenus: getMenus,
  createLocations: createLocations,
  createRoutes: createRoutes,
  updateRoutes: updateRoutes,
  deleteRoutes: deleteRoutes,
  getLocations: getLocations
}