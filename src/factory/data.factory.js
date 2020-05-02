const factory = require('factory-girl').factory;

const db = require('../models');

factory.define('data', db.Data, () => {
  let attrs = {
    temperature: factory.chance('floating', { min: 0, max: 100 }),
    humid: factory.chance('floating', { min: 0, max: 100 }),
    light: factory.chance('natural', { min: 0, max: 1023 })
  };
  return attrs;
});

module.exports = factory;
