var foodieDB = require('./db');

db = new foodieDB();

function updateUsers (req, res, next) {
  var username = req.params.username || username
    , data = req.body || data
    ;

  if (!username) return res.status(500).end();
  db.User.update(data, { where: { username: username }})
    .then(function (rows) {
      return res.status(200).end();
    })
    .catch(function (err) {
      return res.status(500).end();
    })
  ;
}

function deleteUsers (req, res, next) {
  var username = req.params.username || username;
  if (!username) return res.status(500).end();
  db.User.find({ where: { username: username }})
    .then(function (user) {
      user.destroy()
        .then(function (done) {
          return res.status(200).end();
        })
        .catch(function (err) {
          return res.status(500).end();
        })
      ;
    })
    .catch(function (err) {
      return res.status(500).end();
    })
  ;
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
  };
  if (!data.name) return res.status(500).end();
  db.Truck.find({ where: { name: data.name }})
    .then(function (truck) {
      if (!truck) {
        db.Truck.create(data)
        .then(function (newTruck) {
          return res.status(200).end();
        })
        .catch(function (err) {
          return res.status(500).end();
        })
      }
      else {
        return res.status(200).end();
      }
    })
    .catch(function (err) {
      return res.status(500).end();
    })
  ;
}

function updateTrucks (req, res, next) {

}

function deleteTrucks (req, res, next) {
  var truck = req.params.truck || truck;
  if (!truck) return res.status(500).end();
  db.Truck.find({ where: { name: truck }})
    .then(function (truck) {
      truck.destroy()
        .then(function (done) {
          return res.status(200).end();
        })
        .catch(function (err) {
          return res.status(500).end();
        })
      ;
    })
    .catch(function (err) {
      return res.status(500).end();
    })
  ;
}

function getTrucks (req, res, next) {

}

function createMenus (req, res, next) {

}

function updateMenus (req, res, next) {

}

function deleteMenus (req, res, next) {

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