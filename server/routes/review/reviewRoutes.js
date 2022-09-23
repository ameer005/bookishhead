const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const authorizedUser = require("../../middleware/authorization/authorization");
const {
  addReview,
  getReview,
  deleteReview,
  updateReview,
} = require("../../controllers/review/reviewController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authenticateUser, addReview)
  .get(authenticateUser, getReview);

router
  .route("/:id")
  .delete(authenticateUser, deleteReview)
  .patch(authenticateUser, updateReview);

module.exports = router;
