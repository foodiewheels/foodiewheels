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
        user_id: req.user.id,
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

      var relation, constructor;

      relation = req.params.menu ? 'menu' : 'menus';

      constructor = {
        table: 'menu',
        lookup: 'truck',
        relation: relation,
        where: { name: req.params.truck }
      };

      if (req.params.menu) {
        constructor.selectorKey = 'title';
        constructor.selectorValue = req.params.menu;
      }

      db.read(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    updateMenu: function (req, res, next) {

      var constructor = {
        table: 'menu',
        related: ['user', 'truck'],
        user_id: req.user.id,
        truck: req.params.truck,
        where: { title: req.params.menu },
        body: {
          title: req.body.title,
          description: req.body.description,
          items: JSON.parse(req.body.items),
          active: req.body.active
        }
      }

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });
    },

    deleteMenu: function (req, res, next) {

      var constructor = {
        table: 'truck',
        where: { name: req.params.truck }
      };

      db.delete(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    createLocation: function (req, res, next) {

    },

    createRoute: function (req, res, next) {

    },

    updateRoute: function (req, res, next) {

    },

    deleteRoute: function (req, res, next) {

    },

    getLocation: function (req, res, next) {

    }

  }

};