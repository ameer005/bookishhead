const List = require("../../models/list/listModel");
const Book = require("../../models/book/bookModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const APIFeature = require("../../utils/apiFeatures/apiFeatures");

// adding book to user's list
exports.addBookToList = catchAsync(async (req, res, next) => {
  const { bookId } = req.body;

  const book = Book.findById(bookId);

  if (!book) {
    return next(new AppError("No book found with this id", 400));
  }

  const listItem = await List.create({
    book: bookId,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    listItem,
  });
});

// get user's book list
exports.getUserBooksList = catchAsync(async (req, res, next) => {
  const features = new APIFeature(
    List.find({ user: req.user._id }).populate({
      path: "book",
      select: "title coverImg author _id",
    }),
    req.query
  ).filter();

  const booksList = await features.query;

  res.status(200).json({
    status: "success",
    results: booksList.length,
    booksList,
  });
});

exports.getUserBooksListItem = catchAsync(async (req, res, next) => {
  const listItem = await List.findOne({
    book: req.params.id,
    user: req.user._id,
  });

  if (!listItem) {
    return next(new AppError("you didn't added this book to the list", 400));
  }

  res.status(200).json({
    status: "success",
    listItem,
  });
});

exports.updateUserBooksList = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new AppError("Please provide status", 400));
  }

  const listItem = await List.updateOne(
    { book: req.params.id, user: req.user._id },
    { status },
    { new: true, runValidators: true }
  );

  if (!listItem) {
    return next(new AppError("Wrong book id", 400));
  }

  res.status(200).json({
    status: "success",
  });
});

exports.deleteUserBooksListItem = catchAsync(async (req, res, next) => {
  const listItem = await List.findByIdAndDelete(req.params.id);

  if (!listItem) {
    return next(new AppError("No list Item found with this id", 400));
  }

  res.status(204).json({
    status: "success",
  });
});
