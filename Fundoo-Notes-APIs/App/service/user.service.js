/***********************************************************************************
 * @module       userService
 * @file         user.service.js
 * @description  UserService class for invoking  the callback method for controller 
 * @author       Ganesh Gavhad
 * @since        17/09/2021  
*************************************************************************************/

const userModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class userService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  userLogin = (InfoLogin, callback) => {

    userModel.loginModel(InfoLogin, (error, data) => {
      if (data) {
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            return callback(error + 'Invalid Password', null);
          } else {
            //return callback(null, data)
            const token = jwt.sign(
              {
                id: data._id,
                username: data.firstName,
                lastname: data.lastName,
                password: data.password,
              },
              process.env.SECRET_KEY
            );
            return callback(null, token);
          }
        })
      }
      else {
        return callback(error + 'Invalid login Info, Please Enter Valid Login Info')
      }
    });
  }
}
module.exports = new userService();