const express = require("express");
const listRouter = require("../list/listRoutes.js");
const authenticateUser = require("../../middleware/authentication/authentication");
const {
  login,
  signup,
  activateAccount,
  sendActivationCode,
} = require("../../controllers/user/userController");

const router = express.Router();

router.use("/list", listRouter);

router.route("/signup").post(signup);
router.route("/activateAccount").post(activateAccount);
router.route("/sendActivationCode").post(sendActivationCode);
router.route("/login").post(login);

module.exports = router;
