var db = require('./db')

function updateUsers (req, res, next) {

}

function deleteUsers (req, res, next) {
  var username = req.params.username || username;
  if (!username) return res.status(404).end();
  db.User.find({where: {username: username}})
    .then(function (user) {
      user.destroy()
        .then(function (done) {
          res.status(200).end();
        })
        .catch(function (err) {
          return res.status(404).end();
        })
      ;
    })
    .catch(function (err) {
      return res.status(404).end();
    })
  ;
}

function createTrucks (req, res, next) {

}

function updateTrucks (req, res, next) {

}

function deleteTrucks (req, res, next) {

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