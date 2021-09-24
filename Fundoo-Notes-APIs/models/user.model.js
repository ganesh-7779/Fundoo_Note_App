/***********************************************************************************
 * @module       userModel
 * @file         user.model.js
 * @description  user.model is for collection structure of database and fuction regarding DB
 * @author       Ganesh Gavhad
 * @since        17/09/2021  
*************************************************************************************/

const mongoose = require("mongoose");
const helper = require("../helper/user.helper.js");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// now we need to create a collection

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new Register({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
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
        }else {
          throw err
        }
      });
    }
    catch (error) {
      return callback("Internal error", null)
    }
  }
  loginModel =(loginInfo, callback)=>{
    try{
      Register.findOne({email:loginInfo.email},(error,data) => {
        if(error){
          return callback(error,null)
        }else if(!data){
          return callback("Invalid email",null);
        }else{
          return callback(null,data);
        }
      })
    }catch(error){
      callback ("Internal error", null);
    }
  }
}
module.exports = new userModel();