const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Category = require("./category");

User.hasMany(Post, { foreignKey: "author_id" });
Post.belongsTo(User, { foreignKey: "author_id" });

Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

User.hasMany(Comment, { foreignKey: "author_id" });
Comment.belongsTo(User, { foreignKey: "author_id" });

Category.hasMany(Post, { foreignKey: "category_id" });
Post.belongsTo(Category, { foreignKey: "category_id" });
