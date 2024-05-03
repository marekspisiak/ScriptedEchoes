const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const checkAuth = require("../middleware/checkAuth");

router.get("/categories/:id", categoriesController.getCategorieById);

router.get("/categories", categoriesController.getAllCategories);

module.exports = router;
