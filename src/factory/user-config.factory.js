const factory = require('factory-girl').factory;

const db = require('../models');

factory.define('user', db.User, () => {
  let attrs = {
    username: factory.chance('string',{length: 8, alpha: true, numeric: true}),
    email: factory.chance('string',{length: 12, alpha: true, numeric: false}),
    password: '223',
  };
  return attrs;
});

factory.define('user-config', db.UserConfig, () => {
  let attrs = {
    tempeThreshold: factory.chance('natural', { min: 0, max: 100 }),
    humidThreshold: factory.chance('natural', { min: 0, max: 100 }),
    lightThreshold: factory.chance('natural', { min: 0, max: 1023 }),
    userId: factory.assoc('user', 'id')
  };
  return attrs;
});

module.exports = factory;