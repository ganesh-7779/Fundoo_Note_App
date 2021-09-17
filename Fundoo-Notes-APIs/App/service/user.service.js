/***********************************************************************************
 * @module       userService
 * @file         user.service.js
 * @description  UserService class for invoking  the callback method for controller 
 * @author       Ganesh Gavhad
 * @since        17/09/2021  
*************************************************************************************/

const userModel = require("../models/user.model.js");

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
}

module.exports = new userService();