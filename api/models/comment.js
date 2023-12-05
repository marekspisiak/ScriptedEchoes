const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user"); // Import modelu User
const Post = require("./post"); // Import modelu Post

const Comment = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post, // Referencia na model Post
        key: "post_id",
      },
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Referencia na model User
        key: "user_id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Zmenené na DataTypes.NOW
    },
  },
  {
    timestamps: false,
    tableName: "comments",
  }
);

module.exports = Comment;
