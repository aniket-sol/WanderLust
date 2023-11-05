const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoogedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews - add - post route
router.post(
  "/",
  isLoogedIn,
  validateReview,
  wrapAsync(reviewController.addReview)
);

//Reviews - delete - post route
router.delete(
  "/:reviewId",
  isLoogedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
