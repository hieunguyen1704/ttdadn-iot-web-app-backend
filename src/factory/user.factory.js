const factory = require('factory-girl').factory;

const db = require('../models');

factory.define('data', db.Data, () => {
    let attrs = {
        username: factory.chance('floating', { min: 0, max: 100 }),
        email: factory.chance('floating', { min: 0, max: 100 }),
        password: factory.chance('natural', { min: 0, max: 1023 })
    };
    return attrs;
});

module.exports = factory;
