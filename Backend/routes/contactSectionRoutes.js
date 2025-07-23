const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactSectionController");

router.get("/", controller.getContactSection);
router.put("/", controller.updateContactSection);

module.exports = router;
