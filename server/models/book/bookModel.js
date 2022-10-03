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
    summary: {
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
      default: 0,
      min: [0, "Rating must be above 0"],
      max: [10, "Rating must be below 10"],
    },
    genres: [{ name: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
