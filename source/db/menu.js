'use strict';

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
      truck: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      items: DataTypes.TEXT
  });

  return Menu;
};