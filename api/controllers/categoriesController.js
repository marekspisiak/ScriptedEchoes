const Post = require("../models/post");
const Category = require("../models/category");

const categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Post,
            attributes: ["title", "content"],
          },
        ],
      });
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send(error.message);
    }
  },
  // Získanie konkrétneho komentára podľa ID
  getCategorieById: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).send("Category not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = categoriesController;
