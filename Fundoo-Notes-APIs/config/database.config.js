/* eslint-disable quotes */
/**
 * @description   : DBconnection class is use for connecting to database Through mongoose connect method
 * @author        : Ganesh
 */
const mongoose = require('mongoose');
const url = process.env.URL;

class DBconnection {
  database = () => {
    // mongoose.Promise = global.Promise;
    // mongoose connect method help us to connect with DB
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("sucessfully connected to the database");
    }).catch(err => {
      console.log("Could not connect to the database. Exiting now..", err);
      process.exit();
    });
  }
}
module.exports = new DBconnection();
