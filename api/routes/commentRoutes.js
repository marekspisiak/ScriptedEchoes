const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const checkAuth = require("../middleware/checkAuth");

router.get("/comments/:id", commentsController.getCommentById);

router.delete("/comments/:id", checkAuth, commentsController.deleteComment);

router.patch("/comments/:id", checkAuth, commentsController.updateComment);

module.exports = router;
