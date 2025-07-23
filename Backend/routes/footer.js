const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");

// GET footer config
router.get("/", footerController.getFooter);

// PUT footer config
router.put("/", footerController.updateFooter);

module.exports = router;
