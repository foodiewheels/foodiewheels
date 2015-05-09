module.exports = function (db) {

  return {

    deleteUser: function (req, res, next) {

      var constructor = {
        table: 'users',
        where: { username: req.params.username }
      };

      db.delete(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    updateUser: function (req, res, next) {

      var constructor = {
        table: 'users',
        where: { username: req.params.username },
        body: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
      };

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    createTruck: function (req, res, next) {

      var constructor = {
        table: 'truck',
        where: { name: req.body.name },
        body: {
          users_id: req.user.attributes.users_id,
          name: req.body.name,
          description: req.body.description,
          owners: JSON.parse(req.body.owners),
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website,
          active: req.body.active
        }
      };

      db.create(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    getTruck: function (req, res, next) {

      var constructor = { table: 'truck' };

      if (req.params.truck) {
        constructor['where'] = { name: req.params.truck };
      }

      db.read(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    updateTruck: function (req, res, next) {

      var constructor = {
        table: 'truck',
        where: { name: req.params.truck },
        body: {
          users_id: req.user.attributes.users_id,
          name: req.body.name,
          description: req.body.description,
          owners: JSON.parse(req.body.owners),
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website,
          active: req.body.active
        }
      };

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    deleteTruck: function (req, res, next) {

      var constructor = {
        table: 'truck',
        where: { name: req.params.truck }
      };

      db.delete(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    createMenu: function (req, res, next) {

      var constructor = {
        table: 'menu',
        lookup: 'truck',
        where: { name: req.params.truck },
        body: {
          title: req.body.title,
          description: req.body.description,
          items: JSON.parse(req.body.items),
          active: req.body.active
        }
      };

      db.create(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    getMenu: function (req, res, next) {

      new db.Truck({ name: req.params.truck })
        .fetch()
        .then(function (a) {
          a.related('menu').fetch()
            .then(function (b) {
              console.log(b);
            })
            .catch(function (c) {
              console.log(c);
            })
          ;
        })
        .catch(function (e) {
          console.log(e);
        })
      ;
/*
      var constructor = { table: 'menu' };

      if (req.params.truck) {
        constructor['where'] = { name: req.params.truck };
      }

      if (req.params.truck && req.params.menu) {
        constructor['where'] = {
          name: req.params.truck,
          title: req.params.menu
        };
      }

      db.read(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });
*/
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