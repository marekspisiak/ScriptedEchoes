const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const checkAuth = require("../middleware/checkAuth");
const upload = require("../middleware/fileUpload"); // Predpokladajme, že tu máte multer konfiguráciu

// Zmena POST route pre posts na použitie multer a checkAuth
router.post(
  "/posts",
  checkAuth,
  upload.single("image"),
  postsController.createPost
);

// Ostatné routes zostávajú nezmenené
router.get("/posts", postsController.getAllPosts);
router.get("/posts/:id", postsController.getPostById);
router.delete("/posts/:id", checkAuth, postsController.deletePost);
router.patch(
  "/posts/:id",
  checkAuth,
  upload.single("image"),
  postsController.updatePost
);
router.get("/posts/:postId/comments", commentsController.getAllCommentsForPost);
router.post(
  "/posts/:postId/comments",
  checkAuth,
  commentsController.createCommentForPost
);
router.get("/featured", postsController.getFeaturedPosts);

module.exports = router;
