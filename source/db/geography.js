'use strict';

module.exports = function (sequelize, DataTypes) {
  var Geography = sequelize.define('Geography', {
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    county: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    datetime: DataTypes.DATE,
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: -180, max: 180 }
    }
  });

  return Geography;
};