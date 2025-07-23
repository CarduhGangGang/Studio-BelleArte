const express = require("express");
const router = express.Router();
const controller = require("../controllers/teamSectionConfigController");

router.get("/", controller.getConfig);
router.put("/", controller.updateConfig);

module.exports = router;
