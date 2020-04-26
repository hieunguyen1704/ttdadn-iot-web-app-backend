'use strict';
module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    temperature: DataTypes.REAL,
    humid: DataTypes.REAL,
    light: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Data.associate = function(models) {
    // associations can be defined here
  };
  return Data;
};
