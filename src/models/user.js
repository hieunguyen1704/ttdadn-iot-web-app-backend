/* eslint-disable no-unused-vars */
'use strict';
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
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
