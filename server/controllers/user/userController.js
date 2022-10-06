const User = require("../../models/user/userModel");
const Book = require("../../models/book/bookModel");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../../utils/appError/appError");
const catchAsync = require("../../utils/catchAsync/catchAsync");
const generateOtp = require("../../utils/otp/generateOTP");

const {
  sendActivationCode,
  sendForgotPasswordCode,
  sendNewPassword,
} = require("../../utils/email/email");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("userImage");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${Date.now()}-${req.user._id}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/user/${req.file.filename}`);

  next();
};

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

// change password
exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide all values", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid password", 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});

// updating user info
exports.updateMe = catchAsync(async (req, res, next) => {
  const userImage = req?.file?.filename;
  console.log("yo");

  if (req.body.password || req.body.email) {
    return next(
      new AppError("This route is not for changing password/email", 400)
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...req.body, userImage },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getMyInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select(
    "-adminAccess -activationCode -__v"
  );

  res.status(200).json({
    status: "success",
    user,
  });
});
