const merge = require('lodash').merge;
const config = require('dotenv').config;
const env = process.env.NODE_ENV || 'development';
if (env === 'testing' || env === 'test') {
  config({ path: '.env.test' });
} else {
  config();
}

const baseConfig = {
  env,
  port: 5432,
  username: 'postgres',
  password: null,
  database: 'ttdadn',
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  secrets: {
    jwt: '',
    jwtExp: '15p',
  },
};

let envConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '15m',
    jwtLong: '100d',
  },
};

module.exports = merge(baseConfig, envConfig);
