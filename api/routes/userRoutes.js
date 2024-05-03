const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const checkAuth = require("../middleware/checkAuth");
const upload = require("../middleware/fileUpload");

router.get("/users", usersController.getAllUsers);

router.get("/users/:id", usersController.getUserById);

router.patch(
  "/users/profile",
  checkAuth,
  upload.single("image"),
  usersController.changeProfile
);

module.exports = router;
