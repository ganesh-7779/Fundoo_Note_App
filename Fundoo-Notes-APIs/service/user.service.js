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
            logger.error("Password not match");
            return callback(error + "Invalid Password", null);
          } else {
            logger.info(" token generated ");
            const token = helper.token(InfoLogin);
            return callback(null, token);
          }
        });
      } else {
        logger.error("Invalid login Info, Please Enter Valid Login Info");
        return callback(error);
      }
    });
  }

  forgotPass = (email, callback) => {
    userModel.forgotPass(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  }

  resetPass = (userData, callback) => {
    helper.getEmailFromToken(userData.token, (error, data) => {
      if (error) {
        logger.error("not getting decoded data");
        return callback(error, null);
      } else {
        const inputData = {
          email: data.dataForToken.email,
          password: userData.password
        };
        userModel.resetPass(inputData, (error, data) => {
          if (error) {
            logger.error("password not update in model");
            return callback(error, null);
          } else {
            logger.info("getting upadated password in data");
            return callback(null, data);
          }
        });
      }
    });
  }
}

module.exports = new UserService();
