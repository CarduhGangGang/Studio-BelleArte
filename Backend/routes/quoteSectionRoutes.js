const express = require("express");
const router = express.Router();
const controller = require("../controllers/quoteSectionController");
const { autenticar, autorizar } = require("../middleware/authMiddleware");

router.get("/", controller.getQuote);
router.put("/", autenticar, autorizar(1), controller.updateQuote);

module.exports = router;
