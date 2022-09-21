const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const authorizeUser = require("../../middleware/authorization/authorization");
const {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} = require("../../controllers/book/bookController");

const router = express.Router();

router.route("/").get(getBooks).post(authenticateUser, authorizeUser, addBook);

router
  .route("/:id")
  .get(getBook)
  .patch(authenticateUser, authorizeUser, updateBook)
  .delete(authenticateUser, authorizeUser, deleteBook);

module.exports = router;
