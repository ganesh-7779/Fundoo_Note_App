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
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
        // console.log(dataForToken);
        return jwt.sign({ dataForToken }, process.env.SECRET_KEY);
      }

      validateToken = (req, res, next) => {
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        // console.log(token);
        try {
          if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
              if (error) {
                return res.status(400).send({ success: false, message: "Invalid Token" });
              } else {
                req.user = decoded;
                // console.log(req.user);
                next();
              }
            });
          } else {
            return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
          }
        } catch (error) {
          return res.status(500).send({ success: false, message: "Something went wrong!" });
        }
      }

      tokenAuthentication = (req, res, next) => {
        console.log(req.user.token);
        if (req.user.token) {
          next();
        } else {
          // const response = {};
          // response.status = false;
          // response.message = "Failed To Set Google Token...!";
          return res.status(400).send({ success: false, message: "Failed To Set Google Token...!" });
        }
      };
}
module.exports = new Helper();
