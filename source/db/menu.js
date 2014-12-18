'use strict';

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      items: DataTypes.TEXT
  });

  return Menu;
};