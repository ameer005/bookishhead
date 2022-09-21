const express = require("express");
const {
  login,
  signup,
  activateAccount,
  sendActivationCode,
} = require("../../controllers/user/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/activateAccount").post(activateAccount);
router.route("/sendActivationCode").post(sendActivationCode);
router.route("/login").post(login);

module.exports = router;
