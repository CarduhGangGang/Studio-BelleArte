const express = require("express");
const router = express.Router();
const {
  getBookingPage3Config,
  updateBookingPage3Config
} = require("../controllers/bookingPage3ConfigController");

router.get("/booking-page-3-config", getBookingPage3Config);
router.put("/booking-page-3-config", updateBookingPage3Config);

module.exports = router;
