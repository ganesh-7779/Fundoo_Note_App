/* eslint-disable node/handle-callback-err */
/* eslint-disable quotes */
/**
 * @description   : Controller class is use for taking HTTP request from the client or users and gives the response to client through DB
 * @author        : Ganesh
 */
const userService = require("../service/user.service.js");
const validation = require("../helper/user.validation.js");
const logger = require("../logger/logger.js");
// const { token } = require("../helper/user.helper.js");

class UserController {
  /**
   * @description Create and save user and sending response to service
   * @method registration to save the user into database
   * @param req,res for service
   */
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
        logger.error(validationRegister.error);
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
      logger.error(error);
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null
      });
    }
  };

  /**
   * @description retrieving login info from user by email and password
   * @method loginReq
   * @param req,res for service
   */
  loginReq = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password
      };
      const loginValidation = validation.loginSchema.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error(loginValidation.error);
        res.status(422).send({
          success: false,
          message: loginValidation.error.message
        });
      }
      userService.userLogin(userLoginInfo, (error, token) => {
        if (error) {
          logger.error(error);
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

  /**
   * description controller function for forgot password
   * @param {*} req body will take email
   * @param {*} res should have generated token to send user
   */
  // forgot password
  forgotPass = (req, res) => {
    try {
      const email = req.body;
      const loginValidation = validation.forgetSchema.validate(email);
      if (loginValidation.error) {
        // logger.error("validation error for email");
        res.status(422).send({
          success: false,
          message: loginValidation.error.message
        });
      }
      userService.forgotPass(email, (error, data) => {
        if (error) {
          logger.error(error);
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

  /**
   * description controller function for forgot password
   * @param {*} req will take email from decode token data and password wiil get from req body
   * @param {*} res should have pass reset succefully
   * @returns
   */

  // reset password
  resetPass = (req, res) => {
    try {
      const inputData = {
        email: req.user.dataForToken.email,
        password: req.body.password
      };
      console.log(inputData);
      const resetValidation = validation.resetSchema.validate(inputData);
      if (resetValidation.error) {
        logger.error("Invalid password");
        res.status(422).send({ success: false, message: "Invalid password" });
        return;
      }
      userService.resetPass(inputData, (error, userData) => {
        if (error) {
          logger.error(error);
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
      logger.error(error);
      return res.status(500).send({
        success: false,
        message: "Internal server error"
      });
    }
  };

  /**
   * description socialLogin controller function for login user using google
   * @param {*} req req shoul have req.user
   * @param {*} res should have user log in succefully
   * @returns
   */
  socialLogin = (req, res) => {
    const googleProfile = req.user.profile;
    // const response = {};
    const googleInfo = {
      firstName: googleProfile.name.givenName,
      lastName: googleProfile.name.familyName,
      email: googleProfile.emails[0].value,
      password: null,
      googleId: googleProfile.id,
      googleLogin: true
    };
    // console.log(googleProfile.emails[0].value + "    google info");
    userService.socialLogin(googleInfo).then((data) => {
      return res
        .status(200)
        .send({
          success: true,
          message: "Login Successfully...!",
          token: data
        });
    })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: "Login Failed...!'"
        });
      });
  };
}
module.exports = new UserController();
