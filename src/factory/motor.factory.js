const factory = require('factory-girl').factory;

const db = require('../models');

factory.define('motor', db.motorLogs, () => {
  let attrs = {
    state: false,
  };
  return attrs;
});

module.exports = factory;
