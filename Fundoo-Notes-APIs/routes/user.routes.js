/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller.js");
const middleware = require("../helper/user.helper");
const noteController = require("../controllers/notes.controller.js");
const labelController = require("../controllers/label.controller");

module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/login", userController.loginReq);
  app.post("/forgotPassword", userController.forgotPass);
  app.put("/resetPassword", middleware.validateToken, userController.resetPass);

  /*
   *CRUD operation APIs For notes
   */

  // create note apis
  app.post("/createnotes", middleware.validateToken, noteController.createNote);

  // Get all note API
  app.get("/getAllNotes", middleware.validateToken, noteController.getAllNotes);

  // get note by id
  app.get("/getByID/:noteID", middleware.validateToken, noteController.getById);

  // update note by id
  app.put("/updateNoteById/:noteID", middleware.validateToken, noteController.updateNote);

  // Delete note by id API
  app.delete("/deleteById/:noteID", middleware.validateToken, noteController.deleteById);

  /*
   *CRUD operation APIs For label
   */

  // Create label APIs
  app.post("/createLabel", middleware.validateToken, labelController.createLabel);
  app.get("/getAllLabel", middleware.validateToken, labelController.getAllLabel);
  app.get("/getLabelbyID/:labelID", middleware.validateToken, labelController.getLabelById);
  app.put("/updateLabelById/:labelID", middleware.validateToken, labelController.updateLabel);
  app.delete("/deleteLabelById/:labelID", middleware.validateToken, labelController.deleteById);
};
