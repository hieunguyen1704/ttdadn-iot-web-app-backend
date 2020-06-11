'use strict';
module.exports = (sequelize, DataTypes) => {
  const motorLog = sequelize.define(
    'motorLog',
    {
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    },
    {}
  );
  
  return motorLog;
};
