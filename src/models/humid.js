'use strict';
module.exports = (sequelize, DataTypes) => {
  const Humid = sequelize.define('Humid', {
    value: DataTypes.INTEGER
  }, {});
  Humid.associate = function(models) {
    // associations can be defined here
  };
  return Humid;
};