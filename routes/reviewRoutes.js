const express = require("express");

const authController = require("../controllers/authController");

const {
  getAllReviews,
  createNewReview,
  deleteSingleReview,
  updateSingleReview,
  setTourUserIds,
  getSingleReview,
} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(getAllReviews)
  .post(authController.restrictTo("user"), setTourUserIds, createNewReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authController.restrictTo("user", "admin"), updateSingleReview)
  .delete(authController.restrictTo("user", "admin"), deleteSingleReview);

module.exports = router;
