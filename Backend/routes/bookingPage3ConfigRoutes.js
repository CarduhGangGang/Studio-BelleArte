const express = require("express");
const router = express.Router();
const {
  getBookingPage3Config,
  updateBookingPage3Config
} = require("../controllers/bookingPage3ConfigController");

// ✅ Rota correta esperada pelo frontend: /api/booking-page-3-config
router.get("/booking-page-3-config", getBookingPage3Config);
router.put("/booking-page-3-config", updateBookingPage3Config);

module.exports = router;
