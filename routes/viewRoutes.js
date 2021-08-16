const express = require("express");

const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const {
  getOverview,
  getTour,
  getLogin,
  getAccount,
  updateUserData,
  getOwnTours,
} = require("../controllers/viewsController");

const router = express.Router();

router.get(
  "/",
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  getOverview
);
router.get("/tours/:slug", authController.isLoggedIn, getTour);
router.get("/login", authController.isLoggedIn, getLogin);
router.get("/me", authController.protect, getAccount);
router.get("/my-tours", authController.protect, getOwnTours);

// router.post("/submit-user-data", authController.protect, updateUserData);

module.exports = router;
