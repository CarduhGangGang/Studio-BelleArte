const express = require("express");
const router = express.Router();

const {
  getBookingPage1Config,
  updateBookingPage1Config,
} = require("../controllers/bookingPage1ConfigController");

router.get("/", getBookingPage1Config);
router.put("/", updateBookingPage1Config);

module.exports = router;
