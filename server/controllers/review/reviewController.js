const Review = require("../../models/review/reviewModel");
const Book = require("../../models/book/bookModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");

// add review on book
exports.addReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  if (!rating && rating !== 0) {
    return next(new AppError("Please provide all the values", 400));
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  const review = await Review.create({
    rating: rating,
    book: bookId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

// get all reviews of a book
exports.getReviews = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  const reviews = await Review.find({ book: bookId });

  if (!reviews) {
    return next(new AppError("You didn't rate this book", 400));
  }

  res.status(200).json({
    status: "success",
    reviews,
  });
});

// get review of a user on book
exports.getUserReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  const review = await Review.findOne({ book: bookId, user: req.user._id });

  if (!review) {
    return next(new AppError("You didn't rate this book", 400));
  }

  res.status(200).json({
    status: "success",
    review,
  });
});

// delete rating
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("No review found with this id", 400));
  }

  // Review.calcAverageRatings(rating.manga);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) return next(new AppError("No review found with this id", 400));

  // Review.calcAverageRatings(review.manga);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
