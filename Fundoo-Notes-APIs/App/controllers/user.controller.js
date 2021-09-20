/**
 * @description   : Controller class is use for taking HTTP request from the client or users and gives the response to client through DB 
 * @author        : Ganesh 
 */
const userService = require("../service/user.service.js");
const validateSchema = require('../helper/user.validation.js');

class userController {
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };
      
      const validation = validateSchema.validate(user)
        if(validation.error){
            res.status(422).send({
              success:false,
              message: validation.error.message,
            })
        }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(409).json({
            success: false,
            message: "User already exits",
          });
        } else {
          return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null,
      });
    }
  }

  loginReq = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginSchema = require("../helper/user.validation")
      const loginValidation = loginSchema.validate(userLoginInfo)
      if(loginValidation.error){
          res.status(422).send({
            success:false,
            message: loginValidation.error.message,
          })
      }
      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          return res.status(401).json({
            success: false,
            message: "Unable to login. Please enter correct info",
            error,
          });
        } 
          return res.status(201).json({
            success: true,
            message: "User logged in successfully",
            data: data,
          });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while Login",
        data: null,
      });
    }
  }
}

module.exports = new userController();