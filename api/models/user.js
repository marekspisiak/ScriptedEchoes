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
      validate: {
        is: /^[a-zA-Z0-9_-]+$/,
        notNull: {
          msg: "Username je povinný",
        },
        notEmpty: {
          msg: "Username nesmie byť prázdny",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    displayUsername: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username}#${this.user_id}`;
      },
    },
    image: {
      type: DataTypes.STRING(2048),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "users",
    createdAt: "created_at",
  }
);

module.exports = User;
