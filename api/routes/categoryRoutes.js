const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const checkAuth = require("../middleware/checkAuth");

// Získanie konkrétneho komentára podľa ID
router.get("/comments/:id", categoriesController.getCategorieById);

router.get("/categories", categoriesController.getAllCategories);

module.exports = router;
