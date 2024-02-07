const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const checkAuth = require("../middleware/checkAuth");

router.get("/posts", postsController.getAllPosts);

router.get("/posts/:id", postsController.getPostById);

router.post("/posts", checkAuth, postsController.createPost);

router.delete("/posts/:id", checkAuth, postsController.deletePost);

module.exports = router;
