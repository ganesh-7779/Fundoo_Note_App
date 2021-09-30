/* eslint-disable eol-last */
/* eslint-disable no-unused-expressions */
const nodemailer = require("nodemailer");
const helper = require("../helper/user.helper");
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
    subject: "Password change link",
    html: `
              <h2>please click on the link to change password</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
      return info.response;
    }
  });
};