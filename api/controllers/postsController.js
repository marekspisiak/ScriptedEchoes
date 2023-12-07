const Post = require("../models/post.js");
const User = require("../models/user.js");

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
    const auth0Id = req.auth.payload.sub; // Získajte auth0_id z kontextu požiadavky
    const postId = req.params.id;

    // Najskôr získajte author_id z tabuľky users
    const user = await User.findOne({ where: { auth0_id: auth0Id } });

    if (!user) {
      return res.status(404).send("Užívateľ nebol nájdený");
    }

    // Potom overíme, či príspevok patrí prihlásenému užívateľovi
    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    if (post.author_id !== user.user_id) {
      return res
        .status(403)
        .send("Nemáte oprávnenie odstrániť tento príspevok");
    }

    // Ak príspevok patrí užívateľovi, odstráňte ho
    await Post.destroy({ where: { post_id: postId } });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
