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
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// now we need to create a collection

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class UserModel {
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
          throw err;
        }
      });
    } catch (error) {
      // logger.error("Internal error");
      return callback("Internal error", null);
    }
  }

  loginModel = (loginInfo, callback) => {
    try {
      Register.findOne({ email: loginInfo.email }, (error, data) => {
        if (error) {
          return callback(error, null);
        } else if (!data) {
          return callback("Invalid email", null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      callback("Internal error", null);
    }
  }

  forgotPass = (data, callback) => {
    Register.findOne({ email: data.email }, (err, data) => {
      if (err) {
        logger.error("User with email id doesnt exists");
        return callback("User with email id doesnt exists", null);
      } else {
        return callback(null, data);
      }
    });
  };

  resetPass = async (userData, callback) => {
    const hashPass = bcrypt.hashSync(userData.password, 10);
    const data = await Register.findOne({ email: userData.email });
    Register.findByIdAndUpdate(data.id, { firstName: data.firstName, lastName: data.lastName, password: hashPass }, { new: true }, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };
}
module.exports = new UserModel();
