const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    auth0_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Zmenené na DataTypes.NOW
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = User;
