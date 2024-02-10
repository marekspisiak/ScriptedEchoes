const Post = require("../models/post.js");
const User = require("../models/user.js");
const Category = require("../models/category.js");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Category, attributes: ["name", "description"] }],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "user_id"], // Vyberieme len meno užívateľa
        },
        {
          model: Category,
          attributes: ["name", "description"], // Vyberieme len názov kategórie
        },
      ],
    });

    if (post) {
      const result = {
        ...post.get({ plain: true }), // Konvertuje Sequelize model na obyčajný objekt
        User: { username: `${post.User.username}#${post.User.user_id}` }, // Pridáme username priamo do objektu
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
    return res.status(400).send("Názov, obsah a autor sú povinné údaje.");
  }

  try {
    const newPost = await Post.create({
      title,
      content,
      author_id,
      description,
      category_id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Chyba pri vytváraní príspevku:", error);
    res.status(500).send(error.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const user_id = req.auth.payload.user_id;
    const postId = req.params.id;

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    if (post.author_id !== user_id) {
      return res
        .status(403)
        .send("Nemáte oprávnenie odstrániť tento príspevok");
    }

    await post.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const user_id = req.auth.payload.user_id;
    const postId = req.params.id;
    const { title, content, description, category: category_id } = req.body;

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    if (post.author_id !== user_id) {
      return res.status(403).send("Nemáte oprávnenie upraviť tento príspevok");
    }

    await post.update({
      title,
      content,
      description,
      category_id,
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
