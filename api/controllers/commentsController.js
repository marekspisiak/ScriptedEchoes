const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const commentsController = {
  // Získanie všetkých komentárov pre konkrétny post
  getAllCommentsForPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.findAll({
        where: { post_id: postId },
        include: [
          {
            model: User,
            attributes: ["username", "email"], // Príklad toho, čo by ste mohli chcieť zahrnúť
          },
        ],
      });
      res.json(comments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Získanie konkrétneho komentára podľa ID
  getCommentById: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"], // Príklad toho, čo by ste mohli chcieť zahrnúť
          },
          {
            model: Post,
            attributes: ["title"], // Zahrnutie názvu príspevku
          },
        ],
      });
      if (comment) {
        res.json(comment);
      } else {
        res.status(404).send("Comment not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Vytvorenie nového komentára pre post
  createCommentForPost: async (req, res) => {
    try {
      const { content } = req.body;
      const post_id = req.params.postId;
      const author_id = req.auth.payload.user_id;
      const post = await Post.findByPk(post_id);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      const comment = await Comment.create({
        post_id,
        author_id,
        content,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Vymazanie konkrétneho komentára
  deleteComment: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      await comment.destroy();
      res.status(200).send("Comment deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Aktualizácia komentára
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { content } = req.body;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      comment.content = content;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = commentsController;
