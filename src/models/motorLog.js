'use strict';
module.exports = (sequelize, DataTypes) => {
  const motorLog = sequelize.define(
    'motorLogs',
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
