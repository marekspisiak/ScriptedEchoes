const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// Získanie všetkých používateľov
router.get("/posts", postsController.getAllPosts);

// Získanie konkrétneho používateľa podľa ID
router.get("/posts/:id", postsController.getPostById);

// Vytvorenie nového používateľa
router.post("/posts", postsController.createPost);

// Aktualizácia používateľa
router.put("/posts/:id", postsController.updatePost);

// Odstránenie používateľa
router.delete("/posts/:id", postsController.deletePost);

module.exports = router;
