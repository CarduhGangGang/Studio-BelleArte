const express = require("express");
const router = express.Router();
const headerController = require("../controllers/headerController");

// GET /api/header
router.get("/", headerController.getHeader);

// PUT /api/header
router.put("/", headerController.updateHeader);

module.exports = router;
