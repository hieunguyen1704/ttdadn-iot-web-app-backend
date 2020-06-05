'use strict';
const factory = require('../factory/user-config.factory');
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return factory.createMany('user-config',5, {}, {});
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserConfigs', null, {});
  }
};
