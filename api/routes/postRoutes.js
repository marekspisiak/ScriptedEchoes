const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const checkAuth = require("../middleware/checkAuth");
const upload = require("../middleware/fileUpload");
const { verifyPostPermission } = require("../middleware/verifyPermission");

router.post(
  "/posts",
  checkAuth,
  upload.single("image"),
  postsController.createPost
);

router.get("/posts", postsController.getAllPosts);
router.get("/posts/:id", postsController.getPostById);
router.delete(
  "/posts/:id",
  checkAuth,
  verifyPostPermission,
  postsController.deletePost
);
router.patch(
  "/posts/:id",
  checkAuth,
  verifyPostPermission,
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
