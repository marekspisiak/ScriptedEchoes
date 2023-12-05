const Post = require("../models/post.js");

// Získanie všetkých príspevkov
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Získanie konkrétneho príspevku podľa ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Príspevok nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Vytvorenie nového príspevku
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Aktualizácia príspevku
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { post_id: req.params.id },
    });
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send("Príspevok nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Odstránenie príspevku
exports.deletePost = async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: { post_id: req.params.id },
    });
    if (deletePost) {
      res.status(204).send();
    } else {
      res.status(404).send("Príspevok nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
