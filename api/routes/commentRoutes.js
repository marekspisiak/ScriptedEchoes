const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Získanie všetkých používateľov
router.get("/comments", commentsController.getAllComments);

// Získanie konkrétneho používateľa podľa ID
router.get("/comments/:id", commentsController.getCommentById);

// Vytvorenie nového používateľa
router.post("/comments", commentsController.createComment);

// Aktualizácia používateľa
router.put("/comments/:id", commentsController.updateComment);

// Odstránenie používateľa
router.delete("/comments/:id", commentsController.deleteComment);

module.exports = router;
