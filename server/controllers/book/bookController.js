const Book = require("../../models/book/bookModel");
const Review = require("../../models/review/reviewModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

exports.getBooks = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 40;
  const page = req.query.page * 1 || 1;
  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);

  let features;

  // TODO i've to fix this
  if (req.query.title || req.query["genres.name"]) {
    features = new APIFeature(Book.find(), req.query).liveFilter().paginate();
  } else {
    features = new APIFeature(Book.find(), req.query).filter().paginate();
  }

  const books = await features.query;

  if (page > totalPages) {
    return new next(new AppError("No page found", 404));
  }

  res.status(200).json({
    status: "success",
    page,
    totalPages,
    results: books.length,
    books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  res.status(200).json({
    status: "success",
    book,
  });
});

exports.addBook = catchAsync(async (req, res, next) => {
  const { title, author, summary, pages, coverImg, genres } = req.body;

  const book = await Book.create({
    title,
    pages,
    coverImg,
    author,
    summary,
    genres,
  });

  res.status(201).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  // deleting all the ratings on this manga(temporarry fix)
  await Review.deleteMany({ book: book._id });

  res.status(204).json({
    status: "success",
  });
});
