const {
  PROD_DB_USER,
  PROD_DB_NAME,
  PROD_DB_PASSWORD,
  PROD_DB_HOST,

  DEV_DB_NAME,
  DEV_DB_USER,
} = process.env;

require("dotenv").config();

module.exports = {
<<<<<<< HEAD
  development: {
    username: "postgres",
    password: "a1b2c3d4e5",
    database: "team-cosmos-db",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
=======
  "development": {
    "username": DEV_DB_USER,
    "password": "",
    "database":  DEV_DB_NAME,
    "host": "127.0.0.1",
    'port': 5432,
    "dialect": "postgres"
>>>>>>> 22f03a557a5b40eac4946ba4ef86ce6e12c065e7
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
