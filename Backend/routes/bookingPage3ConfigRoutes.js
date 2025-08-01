const express = require("express");
const router = express.Router();
const {
  getBookingPage3Config,
  updateBookingPage3Config
} = require("../controllers/bookingPage3ConfigController");

router.get("/", getBookingPage3Config);
router.put("/", updateBookingPage3Config);

module.exports = router;
