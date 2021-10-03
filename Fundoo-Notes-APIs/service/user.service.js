/* eslint-disable node/no-callback-literal */
/***********************************************************************************
 * @module       userService
 * @file         user.service.js
 * @description  UserService class for invoking  the callback method for controller
 * @author       Ganesh Gavhad
 * @since        17/09/2021
*************************************************************************************/

const userModel = require("../models/user.model.js");
const helper = require("../helper/user.helper.js");
const bcrypt = require("bcrypt");
const logger = require("../logger/logger.js");
const nodemailer = require("../helper/nodemailer");
class UserService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        logger.error("Getting some error in service");
        return callback(error, null);
      } else {
        logger.info(" data found ");
        return callback(null, data);
      }
    });
  };

  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        // validate will take boolean value true and false
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            return callback(error + "Invalid Password", null);
          } else {
            const token = helper.token(InfoLogin);
            return callback(null, token);
          }
        });
      } else {
        return callback(error + "Invalid login Info, Please Enter Valid Login Info");
      }
    });
  }

  forgotPass = (email, callback) => {
    userModel.forgotPass(email, (error, data) => {
      if (error || !data) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  }

  resetPass = (req, callback) => {
    const token = req.token;
    const userdata = helper.verifyToken(token);

    const credentials = {
      id: userdata.dataForToken.id,
      password: req.password
    };
    userModel.resetPass(credentials, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        console.log("service" + data);
        return callback(null, data);
      }
    });
  }

  // const userCredentials = {
  //   email: email,
  //   password: req.password
  // };
}

module.exports = new UserService();
