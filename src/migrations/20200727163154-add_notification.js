'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isNotification', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isNotification');
  },
};
