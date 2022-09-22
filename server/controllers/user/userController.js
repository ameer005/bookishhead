const User = require("../../models/user/userModel");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const generateOtp = require("../../utils/otp/generateOTP");
const {
  sendActivationCode,
  sendForgotPasswordCode,
  sendNewPassword,
} = require("../../utils/email/email");

//***********************CREATE USER FLOW*************************//

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Please provide all values", 400));
  }

  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    return next(new AppError("User already exist", 400));
  }

  const otp = generateOtp();

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    activationCode: otp,
    // adminAccess: true,
  });

  await sendActivationCode(user.name, user.email, user.activationCode);

  res.status(201).json({
    status: "success",
    message: "otp has been successfully sent to your registered email account",
    data: {
      email: user.email,
    },
  });
});

// Activate Account
exports.activateAccount = catchAsync(async (req, res, next) => {
  const { otp, email } = req.body;

  if (!otp) {
    return next(new AppError("Please provide verification otp", 400));
  }

  const user = await User.findOne({ email, activationCode: otp });

  if (!user) {
    return next(new AppError("Please provide a valid otp", 400));
  }

  user.accountActivated = true;
  user.activationCode = "00##00";
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Account successfully activated",
  });
});

// resent activation code
exports.sendActivationCode = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide email", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found", 400));
  }

  const code = generateOtp();

  user.activationCode = code;
  await user.save();

  await sendActivationCode(user.name, user.email, code);

  res.status(200).json({
    status: "success",
  });
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("User doesn't exist", 401));
  }

  if (!user.accountActivated) {
    return next(new AppError("Please activate your account", 403));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = user.createJwt();
  user.password = undefined;
  user.activationCode = undefined;
  user.accountActivated = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// Forgot Password

// Validate Forgot Password

//***********************CREATE USER FLOW*************************//
