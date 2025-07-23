const express = require("express");
const router = express.Router();
const {
  getBookingPage2Config,
  updateBookingPage2Config,
} = require("../controllers/bookingPage2ConfigController");

router.get("/", getBookingPage2Config);
router.put("/", updateBookingPage2Config);

module.exports = router;
