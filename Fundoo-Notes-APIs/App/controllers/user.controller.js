/**
 * @description   : Controller class is use for taking HTTP request from the client or users and gives the response to client through DB 
 * @author        : Ganesh 
*/
const userService = require("../service/user.service.js");

class userController {
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

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
  };
}

module.exports = new userController();