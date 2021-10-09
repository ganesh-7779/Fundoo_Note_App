/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller.js");
const middleware = require("../helper/user.helper");
const Note = require("../controllers/notes.controller.js");
// const notesController = require("../controllers/notes.controller.js");
module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/login", userController.loginReq);
  app.post("/forgotPassword", userController.forgotPass);
  app.put("/resetPassword", middleware.validateToken, userController.resetPass);

  // crud operation APIs on notes
  // creat note apis
  app.post("/createnotes", middleware.validateToken, Note.createNote);
  // Get all note API
  app.get("/getAllNotes", middleware.validateToken, Note.getAllNotes);
  app.get("/getByID/:noteID", middleware.validateToken, Note.getById);
};
