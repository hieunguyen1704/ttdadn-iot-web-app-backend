/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('UserConfigs', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        humidThreshold: {
          type: Sequelize.INTEGER,
        },
        tempeThreshold: {
          type: Sequelize.INTEGER,
        },
        lightThreshold: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'User must be defined',
            },
            notEmpty: {
              msg: 'User must be defined',
            },
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
      
      await queryInterface.addConstraint('UserConfigs', ['userId'], {
        type: 'foreign key',
        name: 'fkey_constraint_user_of_userconfigs',
        references: {
          table: 'Users',
          field: 'id',
        },
        transaction,
      });
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('UserConfigs', 'fkey_constraint_user_of_userconfigs') 
    return queryInterface.dropTable('UserConfigs');
  },
};
