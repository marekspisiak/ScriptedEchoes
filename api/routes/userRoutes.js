const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.getAllUsers);

router.get("/users/:id", usersController.getUserById);

router.get("/users/profile/:id", usersController.getUserProfileById);

router.post("/users", usersController.createUser);

router.put("/users/:id", usersController.updateUser);

module.exports = router;
