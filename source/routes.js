var db = require('./db')

function deleteUser (req, res, next) {
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

module.exports.deleteUser = deleteUser;