const Post = require("../models/post.js");
const User = require("../models/user.js");
const Category = require("../models/category.js");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const {
  getFullImageUrl,
  deleteOldImage,
} = require("../services/imageService.js");

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "newest";
    const categories = req.query.categories;
    const offset = (page - 1) * limit;
    const search = req.query.search;
    const userId = req.query.userId;

    let order;
    switch (sort) {
      case "newest":
        order = [["created_at", "DESC"]];
        break;
      case "oldest":
        order = [["created_at", "ASC"]];
        break;
      case "recentlyUpdated":
        order = [["updated_at", "DESC"]];
        break;
      case "leastRecentlyUpdated":
        order = [["updated_at", "ASC"]];
        break;
      case "mostPopular":
        order = [["view_count", "DESC"]];
        break;
      case "leastPopular":
        order = [["view_count", "ASC"]];
        break;
      default:
        order = [["created_at", "DESC"]];
    }

    let whereCondition = {};
    if (categories) {
      const categoryIds = categories.split(",").map((id) => parseInt(id));
      whereCondition.category_id = categoryIds;
    }

    if (search) {
      whereCondition[Sequelize.Op.or] = [
        {
          title: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
        {
          description: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
      ];
    }

    if (userId) {
      whereCondition.author_id = userId;
    }

    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: Category,
          attributes: ["name", "description"],
        },
      ],
      where: whereCondition,
      limit,
      offset,
      order,
    });

    res.json({
      posts: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalPosts: count,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send(error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
        {
          model: Category,
          attributes: ["name", "description"],
        },
      ],
    });

    if (post) {
      const result = {
        ...post.get({ plain: true }),
        User: { username: `${post.User.username}#${post.User.user_id}` },
      };
      res.json(result);
      post.view_count += 1;
      post.save();
    } else {
      res.status(404).send("Príspevok nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPost = async (req, res) => {
  const { title, content, description, category: category_id } = req.body;
  const author_id = req.auth.payload.user_id;

  if (!title || !content || !author_id || !description) {
    return res
      .status(400)
      .send("Názov, obsah, autor a popisok sú povinné údaje.");
  }

  const imageUrl = getFullImageUrl(req.file?.path);

  try {
    const newPost = await Post.create({
      title,
      content,
      author_id,
      description,
      category_id,
      image: imageUrl,
    });
    res.status(201).json(newPost);
  } catch (error) {
    deleteOldImage(req.file?.path);

    console.error("Chyba pri vytváraní príspevku:", error);
    res.status(500).send(error.message);
  }
};

exports.deletePost = async (req, res) => {
  console.log("tu som");
  try {
    const postId = req.params.id;

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    const oldImagePath = post?.image;

    await post.destroy();

    deleteOldImage(oldImagePath);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      title,
      content,
      description,
      category: category_id,
      image,
    } = req.body;
    const removeImage = image === "REMOVE_IMAGE";

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    let imageUrl = post.image;
    let oldImagePath = null;

    if (req.file) {
      imageUrl = getFullImageUrl(req.file.path);
      oldImagePath = post.image;
    } else if (removeImage) {
      oldImagePath = post.image;
      imageUrl = null;
    }

    await post.update({
      title,
      content,
      description,
      category_id,
      image: imageUrl,
    });

    if (oldImagePath) {
      deleteOldImage(oldImagePath);
    }

    res.status(204).send();
  } catch (error) {
    console.error("Chyba pri aktualizácii príspevku:", error);
    res.status(500).send(error.message);
  }
};

exports.getFeaturedPosts = async (req, res) => {
  try {
    const newestPostsPromise = Post.findAll({
      limit: 3,
      order: [["created_at", "DESC"]],
      include: [{ model: Category, attributes: ["name"] }],
    });

    const mostPopularPostsPromise = Post.findAll({
      limit: 3,
      order: [["view_count", "DESC"]],
      include: [{ model: Category, attributes: ["name"] }],
    });

    const [newestPosts, mostPopularPosts] = await Promise.all([
      newestPostsPromise,
      mostPopularPostsPromise,
    ]);

    res.json({
      newestPosts,
      mostPopularPosts,
    });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    res.status(500).send(error.message);
  }
};
