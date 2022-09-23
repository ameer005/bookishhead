const Book = require("../../models/book/bookModel");
const Review = require("../../models/review/reviewModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

exports.getBooks = catchAsync(async (req, res, next) => {
  const features = new APIFeature(Book.find(), req.query).filter();

  const books = await features.query;

  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  res.status(200).json({
    status: "success",
  });
});

exports.addBook = catchAsync(async (req, res, next) => {
  const { title, author, summary, pages, coverImg, releaseYear, genres } =
    req.body;

  const book = await Book.create({
    title,
    pages,
    coverImg,
    author,
    summary,
    genres,
    releaseYear,
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
