const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const checkAuth = require("../middleware/checkAuth");

router.get("/posts", postsController.getAllPosts);

router.get("/posts/:id", postsController.getPostById);

router.post("/posts", checkAuth, postsController.createPost);

router.delete("/posts/:id", checkAuth, postsController.deletePost);

router.patch("/posts/:id", checkAuth, postsController.updatePost);

router.get("/posts/:postId/comments", commentsController.getAllCommentsForPost);

router.post(
  "/posts/:postId/comments",
  checkAuth,
  commentsController.createCommentForPost
);

router.get("/featured", postsController.getFeaturedPosts);

module.exports = router;
