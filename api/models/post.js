const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user"); // Ako príklad, upravte podľa vašej cesty

const Post = sequelize.define(
  "Post",
  {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Zmenené tu
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Ak chcete, že updated_at má tiež predvolenú hodnotu
    },
  },
  {
    timestamps: false,
    tableName: "posts",
  }
);

module.exports = Post;
