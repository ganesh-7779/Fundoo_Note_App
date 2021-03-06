/*******************************************************************
 * @description   : For Routing the APIs
 * @author        : Ganesh
********************************************************************/
const userController = require("../controllers/user.controller.js");
const middleware = require("../helper/user.helper");
const noteController = require("../controllers/notes.controller.js");
const labelController = require("../controllers/label.controller");
const redisMiddleware = require("../helper/redis");
const passport = require("passport");

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
  app.get("/getAllNotes", middleware.validateToken, redisMiddleware.redis, noteController.getAllNotes);

  // get note by id
  app.get("/getByID/:noteID", middleware.validateToken, noteController.getById);

  // update note by id
  app.put("/updateNoteById/:noteID", middleware.validateToken, noteController.updateNote);

  // Delete note by id API
  app.delete("/deleteById/:noteID", middleware.validateToken, noteController.deleteById);

  app.post("/shareNote/:noteID", middleware.validateToken, noteController.shareNote);

  /*
   *CRUD operation APIs For label
   */

  // Create label APIs
  app.post("/createLabel", middleware.validateToken, labelController.createLabel);

  app.get("/getAllLabel", middleware.validateToken, labelController.getAllLabel);

  app.get("/getLabelbyID/:labelID", middleware.validateToken, labelController.getLabelById);

  app.put("/updateLabelById/:labelID", middleware.validateToken, labelController.updateLabel);

  app.delete("/deleteLabelById/:labelID", middleware.validateToken, labelController.deleteById);

  app.post("/addLabel/:noteID", middleware.validateToken, noteController.addLabeltoNote);

  app.delete("/deleteLabelFromNote/:noteID", middleware.validateToken, noteController.deleteLabel);

  app.get("/failed", (req, res) => res.send("You Have Failed To Login...!!!"));

  // redirect the user to google's authentication service
  // google authenticates the user and ask confirmation from the user to accept/reject your service
  // if the user accepts google redirects the user back to your service's callback uri with an access code.
  // your server (not the user's browser) request an access/refresh token to google's servers using your app's id and secret (as issued from google when registering the app) and the access code received before.
  // if all is good, google will issue an access/refresh token to your service that you will have to associate to an user in your side

  app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));// prompt: "consent", includeGrantedScopes: true

  app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/failed" }), middleware.tokenAuthentication, userController.socialLogin);
};
// "profile",
