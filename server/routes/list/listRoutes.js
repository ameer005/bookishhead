const express = require("express");
const authenticateUser = require("../../middleware/authentication/authentication");
const authorizedUser = require("../../middleware/authorization/authorization");
const {
  addBookToList,
  deleteUserBooksListItem,
  getUserBooksList,
  getUserBooksListItem,
  updateUserBooksList,
} = require("../../controllers/list/listController");

const router = express.Router({ mergeParams: true });

router.use(authenticateUser);
router.route("/").post(addBookToList).get(getUserBooksList);
router
  .route("/:id")
  .get(getUserBooksListItem)
  .patch(updateUserBooksList)
  .delete(deleteUserBooksListItem);

module.exports = router;
