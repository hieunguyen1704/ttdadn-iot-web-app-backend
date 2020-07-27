'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'name',
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '',
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Users',
          'avatar',
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'name', { transaction: t }),
        queryInterface.removeColumn('Users', 'avatar', { transaction: t }),
      ]);
    });
  },
};
