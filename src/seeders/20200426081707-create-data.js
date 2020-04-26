/* eslint-disable no-unused-vars */

'use strict';

const factory = require('../factory/data.factory');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return factory.createMany('data', 10, {}, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Datas', null, {});
  },
};
