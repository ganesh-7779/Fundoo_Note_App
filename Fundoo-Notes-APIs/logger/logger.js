/* eslint-disable eol-last */
const winston = require("winston");

const Logger = winston.createLogger({
  // level: "info",
  json: true,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log", level: "info" })
  ]
});

//  displaying logger message in console
Logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
);

module.exports = Logger;