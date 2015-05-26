module.exports = function (db) {

  return {

    deleteUser: function (req, res, next) {

      var constructor = {
        table: 'users',
        where: { username: req.params.username },
        user_id: req.user.id
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.attributes.users_id) {
          return false;
        }
        return true;
      }

      db.delete(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    updateUser: function (req, res, next) {

      var constructor = {
        table: 'users',
        where: { username: req.params.username },
        user_id: req.user.id,
        body: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.attributes.users_id) {
          return false;
        }
        return true;
      }

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    createTruck: function (req, res, next) {

      var constructor = {
        table: 'truck',
        where: { name: req.body.name },
        user_id: req.user.id,
        body: {
          name: req.body.name,
          description: req.body.description,
          owners: JSON.parse(req.body.owners),
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website,
          active: req.body.active
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== model.relations.user.get('users_id')) {
          return false;
        }
        return true;
      }

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
        relation: ['user'],
        where: { name: req.params.truck },
        user_id: req.user.id,
        body: {
          name: req.body.name,
          description: req.body.description,
          owners: JSON.parse(req.body.owners),
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website,
          active: req.body.active
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        this.body.users_id = this.user_id;
        return true;
      };

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    deleteTruck: function (req, res, next) {

      var constructor = {
        table: 'truck',
        relation: ['user'],
        truck: req.params.truck,
        where: { name: req.params.truck },
        user_id: req.user.id
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        if (this.truck !== m.get('name')) {
          return false;
        }
        return true;
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
        relation: ['user'],
        where: { name: req.params.truck },
        user_id: req.user.id,
        body: {
          title: req.body.title,
          description: req.body.description,
          items: JSON.parse(req.body.items),
          active: req.body.active
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        this.body.truck_id = m.get('truck_id');
        return true;
      }

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
        relation: ['user', 'truck'],
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

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        this.body.truck_id = m.get('truck_id');
        return true;
      }

      db.update(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });
    },

    deleteMenu: function (req, res, next) {

      var constructor = {
        table: 'menu',
        relation: ['user', 'truck'],
        user_id: req.user.id,
        truck: req.params.truck,
        where: { title: req.params.menu }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        if (this.truck !== m.relations.truck.get('name')) {
          return false;
        }
        return true;
      };

      db.delete(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    createLocation: function (req, res, next) {

      var constructor = {
        table: 'current_location',
        lookup: 'truck',
        relation: ['user'],
        user_id: req.user.id,
        truck: req.params.truck,
        where: { name: req.params.truck },
        body: {
          address: req.body.address,
          state: req.body.state,
          city: req.body.city,
          county: req.body.county,
          zipcode: req.body.zipcode,
          lat: req.body.lat,
          lng: req.body.lng,
          active: req.body.active
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        if (this.truck !== m.get('name')) {
          return false;
        }
        this.body.truck_id = m.get('truck_id');
        return true;
      }

      constructor.geometry = function (knex) {
        var SQL = 'UPDATE ? SET the_geom = ST_SetSRID(ST_MakePoint' +
          '(lng, lat), 4326);';
        knex.raw(SQL, [this.table]);
      };

      db.create(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    updateLocation: function (req, res, next) {

      var constructor = {
        table: 'current_location',
        lookup: 'truck',
        relation: ['user'],
        user_id: req.user.id,
        truck: req.params.truck,
        where: { name: req.params.truck },
        body: {
          address: req.body.address,
          state: req.body.state,
          city: req.body.city,
          county: req.body.county,
          zipcode: req.body.zipcode,
          lat: req.body.lat,
          lng: req.body.lng,
          active: req.body.active
        }
      };

      constructor.isAuthenticated = function (m) {
        if (this.user_id !== m.relations.user.get('users_id')) {
          return false;
        }
        if (this.truck !== m.get('name')) {
          return false;
        }
        this.body.truck_id = m.get('truck_id');
        return true;
      }

      constructor.geometry = function (knex) {
        var SQL = 'UPDATE ? SET the_geom = ST_SetSRID(ST_MakePoint' +
          '(lng, lat), 4326);';
        knex.raw(SQL, [this.table]);
      };

      db.create(constructor, function (error, data) {
        if (error) return res.status(500).end();
        else return res.status(200).end();
      });

    },

    deleteLocation: function (req, res, next) {

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