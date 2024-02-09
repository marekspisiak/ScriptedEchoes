const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const commentsController = {
  // Získanie všetkých komentárov pre konkrétny post
  getAllCommentsForPost: async (req, res) => {
    try {
      // Získanie parametra postId z URL
      const postId = req.params.postId;

      // Získanie parametrov page a limit z query, s predvolenými hodnotami
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const offset = (page - 1) * limit;

      // Vytvorenie query s použitím limit a offset pre stránkovanie
      const comments = await Comment.findAll({
        where: { post_id: postId },
        include: [
          {
            model: User,
            attributes: ["username", "user_id"], // Príklad toho, čo by ste mohli chcieť zahrnúť
          },
        ],
        limit: limit,
        offset: offset,
        order: [["created_at", "DESC"]], // Zoradenie komentárov od najnovších po najstaršie
      });

      // Odpoveď s komentármi
      res.json({
        comments: comments,
        currentPage: page,
        totalPages: Math.ceil(comments.count / limit), // Potrebujete celkový počet komentárov pre výpočet, môže vyžadovať ďalší dotaz
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
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

      // Overenie, či príspevok existuje
      const post = await Post.findByPk(post_id);
      if (!post) {
        return res.status(404).send("Post not found");
      }

      // Vytvorenie komentára
      const comment = await Comment.create({
        post_id,
        author_id,
        content,
      });

      // Načítanie informácií o používateľovi
      const user = await User.findByPk(author_id, {
        attributes: ["username", "user_id"],
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Vytvorenie odpovede s komentárom a informáciami o používateľovi
      const response = {
        ...comment.toJSON(), // Prevedie Sequelize model na plain object
        User: {
          username: user.username,
          user_id: user.user_id,
        },
        // Ak je potrebné, pridajte ďalšie kľúče
      };

      res.status(201).json(response);
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
    console.log("som tu ");
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
