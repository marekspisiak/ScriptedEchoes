const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

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
    category_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "posts",
    hooks: {
      beforeCreate: (post, options) => {
        if (post.category_id === "") {
          post.category_id = null; // Nastavíme category_id na null, ak je prázdny reťazec
        }
      },
      beforeUpdate: (post, options) => {
        if (post.category_id === "") {
          post.category_id = null; // Rovnaká logika pre aktualizáciu
        }
      },
    },
  }
);

module.exports = Post;
