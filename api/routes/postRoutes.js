const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const jwtCheck = require("../app");

router.get("/posts", postsController.getAllPosts);

router.get("/posts/:id", postsController.getPostById);

router.post("/posts", postsController.createPost);

router.delete("/posts/:id", jwtCheck, postsController.deletePost);

router.delete("/test", jwtCheck, postsController.test);

module.exports = router;
