/* eslint-disable eol-last */
/* eslint-disable no-unused-expressions */
const nodemailer = require("nodemailer");
const helper = require("../helper/user.helper");
const logger = require("../logger/logger.js");
require("dotenv").config();

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const token = helper.token(data);
  const mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: "Password Reset link",
    html: `
        <h2>Please click on below link to Update your new password</h2>
        <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      return info.response;
    }
  });
};