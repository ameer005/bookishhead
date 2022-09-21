const Book = require("../../models/book/bookModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");

exports.getBooks = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.addBook = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  res.status(204).json({
    status: "success",
  });
});
