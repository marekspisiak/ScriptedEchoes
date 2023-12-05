const Comment = require("../models/comment.js");

// Získanie všetkých komentárov
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Získanie konkrétneho komentára podľa ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).send("Komentár nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Vytvorenie nového komentára
exports.createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Aktualizácia komentára
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: { comment_id: req.params.id },
    });
    if (updatedComment) {
      res.json(updatedComment);
    } else {
      res.status(404).send("Komentár nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Odstránenie komentára
exports.deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: { comment_id: req.params.id },
    });
    if (deleteComment) {
      res.status(204).send();
    } else {
      res.status(404).send("Komentár nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
