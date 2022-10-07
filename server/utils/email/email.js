const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendActivationCode = async (name, email, activationCode) => {
  try {
    const mailOptions = {
      from: "bookishHead",
      to: email,
      subject: "Please activate your account",
      html: `<h1>Account Activation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signing up. Please activate your account by verifying the otp.</p>
        <h1>${activationCode}<h1>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("nodemailer error");
    console.log(err);
  }
};

exports.sendForgotPassLink = async (name, email, url) => {
  try {
    const mailOptions = {
      from: "bookishHead",
      to: email,
      subject: "Reset your password",
      html: `<h1>Reset Password</h1>
        <h2>Hello ${name}</h2>
        <p>go to the link below to reset password, it will expire in 15 minutes</p>
        <h1>${url}<h1>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("nodemailer error");
    console.log(err);
  }
};
