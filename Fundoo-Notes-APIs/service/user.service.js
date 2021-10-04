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
        return callback(error, null);
      } else {
        const inputData = {
          email: data.dataForToken.email,
          password: userData.password
        };
        userModel.resetPass(inputData, (error, data) => {
          if (error) {
            logger.error(error);
            return callback(error, null);
          } else {
            return callback(null, data);
          }
        });
      }
    });

    // const email = data.dataForToken.email;
    // console.log(data);
    // const inputData = {
    //   email: email,
    //   password: userData.password
    // };
    // console.log(inputData);
    // userModel.resetPass(inputData, (error, data) => {
    //   if (error) {
    //     logger.error(error);
    //     callback(error, null);
    //   } else {
    //     console.log("service" + data);
    //     callback(null, data);
  }

  // helper.verifyToken(token, (error, data) => {
  //   if (error) {
  //     return error;
  //   } else {
  //     const credentials = {
  //       email: data.email,
  //       password: userData.password
  //     };
  //     userModel.resetPass(credentials, (error, data) => {
  //       if (error) {
  //         logger.error(error);
  //         return callback(error, null);
  //       } else {
  //         console.log("service" + data);
  //         return callback(null, data);
  //       }
  //     });
  //   }
  // });

  // const userCredentials = {
  //   email: email,
  //   password: req.password
  // };
}

module.exports = new UserService();
