/* eslint-disable node/no-callback-literal */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Helper {
    hashing = (password, callback) => {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          throw err;
        } else {
          return callback(null, hash);
        }
      });
    }

      token = (data) => {
        const dataForToken = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
        return jwt.sign({ dataForToken }, process.env.SECRET_KEY);
      } //, { expiresIn: "1H" }

      // verifyToken =(token, callback) => {
      //   jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
      //     if (data) {
      //       console.log("helper" + data);
      //       return callback(null, data);
      //     } else {
      //       return callback(error, null);
      //     }
      //   });
      // }
      verifyToken = (token, callback) => {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        return data;
      }
}
module.exports = new Helper();
