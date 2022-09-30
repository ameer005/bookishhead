const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const authorizedUser = require("../../middleware/authorization/authorization");
const {
  addReview,
  getReviews,
  deleteReview,
  updateReview,
  getUserReview,
} = require("../../controllers/review/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(authenticateUser, addReview).get(getReviews);
router.route("/user").get(authenticateUser, getUserReview);

router
  .route("/:id")
  .delete(authenticateUser, deleteReview)
  .patch(authenticateUser, updateReview);

module.exports = router;
