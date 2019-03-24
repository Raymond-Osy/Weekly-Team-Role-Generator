require('dotenv').config();

const {
  PROD_DB_USER,
  PROD_DB_NAME,
  PROD_DB_PASSWORD,
  PROD_DB_HOST,

  DEV_DB_NAME,
  DEV_DB_USER,
  DEV_DB_PASSWORD,
  DEV_DB_HOST
} = process.env;

require("dotenv").config();

module.exports = {
  development: {
    username: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    database:  DEV_DB_NAME,
    host: DEV_DB_HOST,
    port: 5432,
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: PROD_DB_USER,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    dialect: "postgres"
  }
};
