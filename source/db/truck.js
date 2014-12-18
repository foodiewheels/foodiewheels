'use strict';

module.exports = function (sequelize, DataTypes) {
  var Truck = sequelize.define('Truck', {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      owners: DataTypes.TEXT,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      active: DataTypes.BOOLEAN
  });

  return Truck;
};