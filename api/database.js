const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydatabase", "api", "api123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
