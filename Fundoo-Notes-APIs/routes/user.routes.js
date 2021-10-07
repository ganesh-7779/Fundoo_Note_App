/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller.js");
const middleware = require("../helper/user.helper");
const Note = require("../controllers/notes.controller.js");
module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/login", userController.loginReq);
  app.post("/forgotPassword", userController.forgotPass);
  app.put("/resetPassword", middleware.validateToken, userController.resetPass);

  app.post("/createnotes", middleware.validateToken, Note.createNote);
};
