const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Získanie všetkých používateľov
router.get("/users", usersController.getAllUsers);

// Získanie konkrétneho používateľa podľa ID
router.get("/users/:id", usersController.getUserById);

router.get("/users/profile/:id", usersController.getUserProfileById);

// Vytvorenie nového používateľa
router.post("/users", usersController.createUser);

// Aktualizácia používateľa
router.put("/users/:id", usersController.updateUser);

// Odstránenie používateľa
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
