// backend/routes/menuRoutes.js
const express = require("express");
const controller = require("../controllers/menuController");

const router = express.Router();

// Rotas
router.get("/", controller.getMenu);
router.post("/", controller.updateMenu);

module.exports = router;