const Review = require("../../models/review/reviewModel");
const Book = require("../../models/book/bookModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

// add review on book
exports.addReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { rating, review: reviewText } = req.body;

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
    review: reviewText,
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

  const limit = req.query.limit * 1 || 40;
  const page = req.query.page * 1 || 1;
  const totalReviews = await Review.countDocuments();
  const totalPages = Math.ceil(totalReviews / limit) || 1;

  let features = new APIFeature(Review.find({ book: book }), req.query)
    .filter()
    .paginate();

  const reviews = await features.query.populate({
    path: "user",
    select: "_id name email userImage",
  });

  if (page > totalPages) {
    return new next(new AppError("No page found", 404));
  }

  res.status(200).json({
    status: "success",
    page,
    totalPages,
    results: reviews.length,
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
