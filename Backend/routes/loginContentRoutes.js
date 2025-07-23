// routes/loginContentRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginContentController");

router.get("/", controller.getAll);
router.put("/", controller.updateContent);

module.exports = router;
