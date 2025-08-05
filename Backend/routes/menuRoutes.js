const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuController");

// Endpoints
router.get("/", controller.getMenu);
router.post("/", controller.updateMenu);

module.exports = router;
