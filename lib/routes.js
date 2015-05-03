module.exports = function (db) {

  return {

    deleteUser: function (req, res, next) {
      var user = new db.User();
      user.where({username: req.params.username})
        .fetch()
        .then(function (model) {
          model.destroy();
          return res.status(200).end();
        })
        .catch(function (error) {
          return res.status(500).end();
        })
      ;
    },

    updateUser: function (req, res, next) {
      var user = new db.User();
      user.where({username: req.params.username});
      user.save({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }, {method: 'update'})
        .then(function (model) {
          return res.status(200).end();
        })
        .catch(function (error) {
          return res.status(500).end();
        })
      ;
    },

    createTruck: function (req, res, next) {
      var truck = new db.Truck();
      truck.where({name: req.body.name})
        .fetch()
        .then(function (truck) {
          if (truck) return res.status(500).end();
          new db.Truck({
            users_id: req.user.attributes.users_id,
            name: req.body.name,
            description: req.body.description,
            owners: JSON.parse(req.body.owners),
            phone: req.body.phone,
            email: req.body.email,
            website: req.body.website,
            active: req.body.active
          })
          .save()
          .then(function (newTruck) {
            return res.status(200).end();
          })
          .catch(function (error) {
            return res.status(500).end();
          })
        })
        .catch(function (error) {
          return res.status(500).end();
        })
      ;
    },

    getTruck: function (req, res, next) {
      var truck = new db.Truck();
      if (req.params.truck) {
        truck.where({name: req.params.truck})
          .fetch()
          .then(function (truck) {
            if (!truck) return res.status(500).end();
            else return res.status(200).end();
          })
          .catch(function (error) {
            res.status(500).end();
          })
        ;
      }
      else {
        truck.fetchAll()
          .then(function (trucks) {
            if (!trucks) return res.status(500).end();
            else return res.status(200).end();
          })
          .catch(function (error) {
            res.status(500).end();
          })
        ;
      }
    },

    updateTruck: function (req, res, next) {
      var truck = new db.Truck();
      truck.where({name: req.params.truck});
      truck.save({
          users_id: req.user.attributes.users_id,
          name: req.body.name,
          description: req.body.description,
          owners: JSON.parse(req.body.owners),
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website,
          active: req.body.active
        }, {method: 'update'})
        .then(function (model) {
          return res.status(200).end();
        })
        .catch(function (error) {
          return res.status(500).end();
        })
      ;
    },

    deleteTruck: function (req, res, next) {
      var truck = new db.Truck();
      truck.where({name: req.params.truck})
        .fetch()
        .then(function (model) {
          model.destroy();
          return res.status(200).end();
        })
        .catch(function (error) {
          return res.status(500).end();
        })
      ;
    },

    createMenu: function () {

    },

    getMenu: function () {

    },

    updateMenu: function () {

    },

    deleteMenu: function () {

    },

    createLocations: function () {

    },

    createRoutes: function () {

    },

    updateRoutes: function () {

    },

    deleteRoutes: function () {

    },

    getLocations: function () {

    }

  }

};