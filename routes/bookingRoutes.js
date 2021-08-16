const express = require("express");

const authController = require("../controllers/authController");
const {
  getCheckoutSession,
  getAllBookings,
  createNewBooking,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.use(authController.protect);

router.get("/checkout-session/:tourId", getCheckoutSession);

router.use(authController.restrictTo("admin", "lead-guide"));

router.route("/").get(getAllBookings).post(createNewBooking);

router
  .route("/:id")
  .get(getSingleBooking)
  .patch(updateSingleBooking)
  .delete(deleteSingleBooking);

module.exports = router;
