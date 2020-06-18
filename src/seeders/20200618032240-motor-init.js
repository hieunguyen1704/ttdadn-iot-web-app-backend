'use strict';
const factory = require('../factory/motor.factory');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return factory.create('motor');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('motorLogs', null, {});
  },
};
