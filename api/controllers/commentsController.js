const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const commentsController = {
  getAllCommentsForPost: async (req, res) => {
    try {
      const postId = req.params.postId;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;

      const comments = await Comment.findAll({
        where: { post_id: postId },
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image"],
          },
        ],
        limit: limit,
        offset: offset,
        order: [["created_at", "DESC"]],
      });

      res.json({
        comments: comments,
        currentPage: page,
        totalPages: Math.ceil(comments.count / limit),
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).send(error.message);
    }
  },

  getCommentById: async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Post,
            attributes: ["title"],
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

      const user = await User.findByPk(author_id, {
        attributes: ["username", "user_id"],
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      const response = {
        ...comment.toJSON(),
        User: {
          username: user.username,
          user_id: user.user_id,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

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
