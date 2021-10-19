/* eslint-disable node/no-callback-literal */
/* eslint-disable new-cap */
/***********************************************************************************
 * @module       userModel
 * @file         user.model.js
 * @description  user.model is for collection structure of database and fuction regarding DB
 * @author       Ganesh Gavhad
 * @since        17/09/2021
 *************************************************************************************/

const mongoose = require("mongoose");
const helper = require("../helper/user.helper.js");
const logger = require("../logger/logger.js");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String

    },
    googleLogin: { type: Boolean }
  },
  {
    timestamps: true
  }
);

// now we need to create a collection

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class UserModel {
  /**
   * @description register user in the database
   * @param userDetails object has user details
   * @param callback help to get back in service
   */
  registerUser = (userDetails, callback) => {
    const newUser = new Register({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password
    });
    try {
      helper.hashing(userDetails.password, (err, hash) => {
        if (hash) {
          newUser.password = hash;
          newUser.save((error, data) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
        } else {
          logger.error(err);
          throw err;
        }
      });
    } catch (error) {
      logger.error(error);
      return callback("Internal error", null);
    }
  };

  /**
   * @description login user from the database
   * @param loginInfo object will contain login info of user
   * @param callback to get back into service with data and error
   */
  loginModel = (loginInfo, callback) => {
    try {
      Register.findOne({ email: loginInfo.email }, (error, data) => {
        if (error) {
          return callback(error, null);
        } else if (!data) {
          return callback("Invalid email", null);
        } else {
          console.log(data + "model");
          return callback(null, data);
        }
      });
    } catch (error) {
      callback("Internal error", null);
    }
  };

  /**
   * @description mongoose function for forgot password
   * @param {*} data will contain email of user
   * @param {*} callback
   */
  forgotPass = (data, callback) => {
    Register.findOne({ email: data.email }, (err, data) => {
      if (err) {
        logger.error(err);
        return callback("User with email id doesnt exists", null);
      } else {
        return callback(null, data);
      }
    });
  };

  /**
   * @description mongooose method for reseting the password
   * @param {*} inputData has email of user to find user and reset password in database
   * @param {*} callback to get back into service
   * @returns
   */
  resetPass = async (inputData, callback) => {
    const hashPass = bcrypt.hashSync(inputData.password, 10);
    const data = await Register.findOne({ email: inputData.email });
    Register.findByIdAndUpdate(
      data.id,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashPass
      },
      { new: true },
      (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
    );
  };

  userExists = async (collabUI) => {
    const data = await Register.findOne({ _id: collabUI.collabUI });
    return data;
  };

   socialLogin = async (userData) => {
     return await Register.findOne({ email: userData.email }).then(data => {
       if (data !== null) {
         console.log(data);
         return data;
       } else {
         const data = new Register({
           firstName: userData.firstName,
           lastName: userData.lastName,
           email: userData.email,
           password: userData.password,
           googleId: userData.googleId,
           googleLogin: userData.googleLogin
         });
         setTimeout(
           function saveData () {
             data.save();
           }, 10000);
         // console.log(data);
         return data;
       }
     }).catch(err => {
       return ("Something went wrong", err);
     });
   };
}
module.exports = new UserModel();
