'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserConfig = sequelize.define(
    'UserConfig',
    {
      humidThreshold: DataTypes.INTEGER,
    },
    {}
  );
  UserConfig.associate = function (models) {
    UserConfig.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return UserConfig;
};
