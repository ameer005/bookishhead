const mongoose = require("mongoose");
const Book = require("../book/bookModel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    min: [0, "Rating must be above 0"],
    max: [10, "Rating must be below 10"],
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Rating must belong to a boOK"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Rating must belong to a user"],
  },
});

// // restricting user to give multiple ratings on samw manga
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  // updating ratings property on manga
  if (stats.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      ratingsQuantity: 0,
      ratingsAverage: 1,
    });
  }
};
// DOCUMENT MIDDLEWARE

// // calling calcAvgRating method on rating model to calucation avg after creating new rating
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.book);
});

// // Recalculating avgratings on update and delete rating
reviewSchema.post(/^findOneAnd/, async function (doc) {
  doc.constructor.calcAverageRatings(doc.book);
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
