const express = require("express");

const listRouter = require("../list/listRoutes.js");
const authenticateUser = require("../../middleware/authentication/authentication");
const {
  login,
  signup,
  activateAccount,
  sendActivationCode,
  updateMe,
  getMyInfo,
  uploadUserPhoto,
  resizeUserPhoto,
  changePassword,
} = require("../../controllers/user/userController");

const router = express.Router();

router.use("/list", listRouter);

router.route("/signup").post(signup);
router.route("/activateAccount").post(activateAccount);
router.route("/sendActivationCode").post(sendActivationCode);
router.route("/login").post(login);
router
  .route("/updateMe")
  .patch(authenticateUser, uploadUserPhoto, resizeUserPhoto, updateMe);
router.route("/myInfo").get(authenticateUser, getMyInfo);
router.route("/changePassword").patch(authenticateUser, changePassword);

module.exports = router;
