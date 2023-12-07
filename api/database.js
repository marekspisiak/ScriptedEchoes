const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydatabase", "api", "api123", {
  host: "mysql-dev",
  dialect: "mysql",
});

module.exports = sequelize;
