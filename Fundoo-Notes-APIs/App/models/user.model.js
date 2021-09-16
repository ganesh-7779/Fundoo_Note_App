const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10; //  Data processing speed
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// now we need to create a collection

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new Register({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    });
    try {
      Register.findOne({ email: userDetails.email }, (error, data) => {
        if (data) {
          return callback("User already exits", null);
        } else {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
              throw err;
            }
            else {
              // returns salt
              bcrypt.hash(userDetails.password, salt, function (err, hash) {
                if (err) {
                  throw err;
                } else {
                    // returns hash
                  newUser.password = hash;
                  newUser.save();
                  return callback(null, newUser);
                }
              })
            }
          })
        }
      })
    }
    catch (error) {
      return callback('Internal Error', null)
    }
  }
}
module.exports = new userModel();