const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "list must belong to a user"],
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: [true, "list must have a book"],
  },
  status: {
    type: String,
    enum: ["Reading", "Completed", "Plan to read"],
    default: "Reading",
  },
});

module.exports = mongoose.model("List", listSchema);
