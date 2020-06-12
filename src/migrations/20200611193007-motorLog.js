'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('motorLog', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        state: {
          type: Sequelize.BOOLEAN,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('motorLog');
  },
};