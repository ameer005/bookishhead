const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide author's name"],
      trim: true,
    },
    summarry: {
      type: String,
    },
    pages: {
      type: Number,
      required: [true, "Please provide Number of pages"],
    },
    coverImg: {
      type: String,
      default: "",
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 1,
      min: [1, "Rating must be above 1"],
      max: [10, "Rating must be below 10"],
    },
    releaseYear: {
      type: Number,
      required: [true, "Please provide release year"],
    },
    genres: [{ name: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
