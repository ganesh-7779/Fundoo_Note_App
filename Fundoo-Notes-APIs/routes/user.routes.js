/*****************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
*****************************************/
const userController = require("../controllers/user.controller.js");
module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/login", userController.loginReq);
  app.post("/forgotPassword", userController.forgotPass);
  app.put("/resetPassword", userController.resetPass);
};
