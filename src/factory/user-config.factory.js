const factory = require('factory-girl').factory;
const db = require('../models');
const userAdmin = require('../factory/user.factory');

factory.define('user-config', db.UserConfig, () => {
  let attrs = {
    tempeThreshold: factory.chance('natural', { min: 10, max: 50 }),
    humidThreshold: factory.chance('natural', { min: 0, max: 100 }),
    lightThreshold: factory.chance('natural', { min: 0, max: 1023 }),
    name: "default",
    userId: userAdmin.assoc('user1', 'id')
  };
  return attrs;
});

module.exports = factory;