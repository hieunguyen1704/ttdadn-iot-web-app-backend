const factory = require('factory-girl').factory;

const db = require('../models');

factory.define('user1', db.User, () => {
    let attrs = {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        isAdmin: 'true',
        isAuto: 'true',
    };
    return attrs;
});

module.exports = factory;
