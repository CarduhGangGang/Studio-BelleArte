const express = require("express");
const router = express.Router();
const { getHistory, updateHistory } = require("../controllers/aboutController");

router.get("/history", getHistory);
router.put("/history", updateHistory);

module.exports = router;
