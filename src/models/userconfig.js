'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserConfig = sequelize.define(
    'UserConfig',
    {
      humidThreshold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tempeThreshold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lightThreshold: {
        type: DataTypes.INTEGER,
        allowNull: false
      },        
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User must be defined',
          },
          notEmpty: {
            msg: 'User must be defined',
          },
        },
      }
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
