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
    enum: ["reading", "completed", "plan to read"],
    default: "reading",
  },
});

module.exports = mongoose.model("List", listSchema);
