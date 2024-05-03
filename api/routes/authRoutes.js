const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwtCheck = require("../app");

router.get("/auth", jwtCheck, authController.getAuthData);

module.exports = router;
