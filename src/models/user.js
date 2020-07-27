/* eslint-disable no-unused-vars */
'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username must be unique',
        },
        validate: {
          notNull: {
            msg: 'Username cannot be null',
          },
          notEmpty: {
            msg: 'Username cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'email is already registered'
        },
        validate: {
          notNull: {
            msg: 'email cannot be null',
          },
          notEmpty: {
            msg: 'email cannot be empty',
          },
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password cannot be null',
          },
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            msg: 'Length of password must greater or equal 6'
          }
        },
      },
      name:{
        type: DataTypes.STRING,
        allowNull: true
      },
      avatar:{
        type: DataTypes.STRING,
        defaultValue: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
        allowNull: true,
      },
      isNotification:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isAuto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  User.beforeCreate(async (user, options) => {
    if (!user.changed('password')) {
      return 0;
    }
    const SALT_FACTOR = 8;
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
  });
  return User;
};
