var sequelize = require('sequelize');

var connect = 'postgres://foodieuser:password@localhost:5432/foodiewheelsdb';

var db = new sequelize(connect);

var User = db.define('User', {
  username: sequelize.STRING,
  email: sequelize.STRING,
  password: sequelize.STRING
});

var Truck = db.define('Truck', {
  name: sequelize.STRING,
  description: sequelize.TEXT,
  owners: sequelize.TEXT,
  phone: sequelize.STRING,
  email: sequelize.STRING,
  website: sequelize.STRING,
  active: sequelize.BOOLEAN
});

var Menu = db.define('Menu', {
  title: sequelize.STRING,
  description: sequelize.TEXT,
  items: sequelize.TEXT
});

var Geography = db.define('Geography', {
  address: sequelize.STRING,
  state: sequelize.STRING,
  county: sequelize.STRING,
  city: sequelize.STRING,
  zipcode: sequelize.INTEGER,
  datetime: sequelize.DATE,
  latitude: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: { min: -180, max: 180 }
  }
});