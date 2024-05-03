const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/test", checkAuth);

module.exports = router;
