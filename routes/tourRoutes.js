const express = require("express");

const authController = require("../controllers/authController");

const {
  getAllTours,
  createNewTour,
  getSingleTour,
  updateSingleTour,
  deleteSingleTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");

const reviewRouter = require("../routes/reviewRoutes");

const router = express.Router();

// router.param("id", checkID);

router.use("/:tourId/reviews", reviewRouter);

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/tour-stats").get(getTourStats);
router
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    getMonthlyPlan
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

router
  .route("/")
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    createNewTour
  );

router
  .route("/:id")
  .get(getSingleTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    uploadTourImages,
    resizeTourImages,
    updateSingleTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    deleteSingleTour
  );

module.exports = router;
