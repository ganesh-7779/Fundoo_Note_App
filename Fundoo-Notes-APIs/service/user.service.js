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
  /**
   * @description Create and save user ,then send response to controller
   * @method registerUser to save the user
   * @param callback callback for controller
   **/
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        logger.info(" data found ");
        return callback(null, data);
      }
    });
  };

  /**
   * @description sends the data to loginApi in the controller
   * @method userLogin to login user and make pass into hash form
   * @param callback for controller
   */
  userLogin = (InfoLogin, callback) => {
    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        // validate will take boolean value true and false
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            logger.error(error);
            return callback(error + "Invalid Password", null);
          } else {
            logger.info(" token generated ");
            console.log(data + "service data for token");
            const token = helper.token(data);
            console.log(token + "service");
            return callback(null, token);
          }
        });
      } else {
        logger.error(error);
        return callback(error);
      }
    });
  };

  /**
   * @description it acts as a middleware between controller and model for reset password
   * @param {*} email
   * @param {*} callback
   * @returns
   */
  forgotPass = (email, callback) => {
    userModel.forgotPass(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  };

  /**
   * @description it acts as a middleware between controller and model for reset password
   * @param {*} inputData
   * @param {*} callback use to call controller
   * @returns
   */
  resetPass = (inputData, callback) => {
    userModel.resetPass(inputData, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        logger.info("getting upadated password in data");
        return callback(null, data);
      }
    });
  };

  /**
   * @description it acts as a middleware between controller and model for socail login using google
   * @param {*} googleInfo shoul have user info from google
   * @returns token with help of jwt
   */
  socialLogin (googleInfo) {
    return new Promise((resolve, reject) => {
      userModel.socialLogin(googleInfo).then((data) => {
        const token = helper.token(data);
        resolve(token);
      }).catch((err) => {
        reject(err);
      });
    });
  };
}

module.exports = new UserService();
