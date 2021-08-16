const factory = require("./handlerFactory");
const Review = require("../models/reviewModel");

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getSingleReview = factory.getSingle(Review);
exports.createNewReview = factory.createNew(Review);
exports.updateSingleReview = factory.updateSingle(Review);
exports.deleteSingleReview = factory.deleteSingle(Review);
