const Review = require("../models/Review");

const catchAsync = require("../utils/catchAsync");

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate({ path: "userId", select: "name surname" })
    .populate({ path: "productId", select: "name" });

  res.status(200).json(reviews);
});

const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.productId) req.body.productId = req.params.productId;
  const newReview = new Review({
    rating: req.body.rating,
    review: req.body.review,
    userId: req.user._id,
    productId: req.body.productId,
  });
  const savedReview = await newReview.save();
  res.status(200).json(savedReview);
});

module.exports = { getAllReviews, createReview };
