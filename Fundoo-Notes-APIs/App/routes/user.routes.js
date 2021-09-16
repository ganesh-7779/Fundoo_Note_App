/*****************************************
 * @description   : For Routing the APIs 
 * @author        : Ganesh 
*****************************************/
const userController = require("../controllers/user.controller.js");
module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
};