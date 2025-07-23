const express = require("express");
const router = express.Router();

const {
  getSection,
  updateSection,
} = require("../controllers/servicesSectionController");

router.get("/", getSection);
router.put("/", updateSection);

module.exports = router; // ✅ Exportação correta
