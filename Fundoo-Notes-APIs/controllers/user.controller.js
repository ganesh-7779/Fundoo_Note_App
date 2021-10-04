/* eslint-disable quotes */
/**
 * @description   : Controller class is use for taking HTTP request from the client or users and gives the response to client through DB
 * @author        : Ganesh
 */
const userService = require("../service/user.service.js");
const validation = require("../helper/user.validation.js");
const logger = require("../logger/logger.js");
class UserController {
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      };
      const validationRegister = validation.validateSchema.validate(user);
      if (validationRegister.error) {
        logger.error("Invalid registration data");
        res.status(422).send({
          success: false,
          message: "Wrong input Validation",
          data: validationRegister
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.info("user already exist");
          return res.status(409).json({
            success: false,
            message: "User already exits"
          });
        } else {
          logger.info("User Registered successfully");
          return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: data
          });
        }
      });
    } catch (error) {
      logger.error("Error while registering");
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null
      });
    }
  };

  loginReq = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginValidation = validation.loginSchema.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error("Invalid login info");
        res.status(422).send({
          success: false,
          message: loginValidation.error.message
        });
      }
      userService.userLogin(userLoginInfo, (error, token) => {
        if (error) {
          logger.error("Unable to login. Please enter correct info");
          return res.status(401).json({
            success: false,
            message: "Unable to login. Please enter correct info",
            error
          });
        }
        logger.info("User logged in successfully");
        return res.status(201).json({
          success: true,
          message: "User logged in successfully",
          token: token
        });
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while Login",
        data: null
      });
    }
  };

  // forgot password
  forgotPass = (req, res) => {
    try {
      const email = req.body;
      const loginValidation = validation.forgetSchema.validate(email);
      if (loginValidation.error) {
        logger.error("validation error for email");
        res.status(422).send({
          success: false,
          message: loginValidation.error.message
        });
      }
      userService.forgotPass(email, (error, data) => {
        if (error) {
          logger.error("Email reset link not sent");
          return res.status(400).send({ error });
        } else {
          logger.info("Email reset link sent succesfully");
          return res.status(200).json({
            success: true,
            message: "Email reset link sent succesfully"
          });
        }
      });
    } catch (error) {
      logger.error("Internal server error");
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        data: null
      });
    }
  };

  // reset password
  resetPass = (req, res) => {
    try {
      const userData = {
        token: req.body.token,
        password: req.body.password
      };
      const loginValidation = validation.resetSchema.validate(userData);
      if (loginValidation.error) {
        logger.error("Invalid password");
        res.status(422).send({
          success: false,
          message: "Invalid password"
        });
        return;
      }
      userService.resetPass(userData, (error, userData) => {
        if (error) {
          logger.error("did not data from service to controller");
          return res.status(400).send({
            message: error,
            success: false
          });
        } else {
          logger.info("Password reset succesfully");
          return res.status(200).json({
            success: true,
            message: "Password reset succesfully",
            data: userData
          });
        }
      });
    } catch (error) {
      logger.error("Internal server error");
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        data: null
      });
    }
  };
}
module.exports = new UserController();
