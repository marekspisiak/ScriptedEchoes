const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const checkAuth = require("../middleware/checkAuth");

// Získanie konkrétneho komentára podľa ID
router.get("/comments/:id", commentsController.getCommentById);

// Vymazanie konkrétneho komentára
router.delete("/comments/:id", checkAuth, commentsController.deleteComment);

// Aktualizácia komentára
router.patch("/comments/:id", checkAuth, commentsController.updateComment);

module.exports = router;
