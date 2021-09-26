// We import express.
require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("./swageer/swagger.json");
const PORT = process.env.PORT;

const option = {
  explorer: true
};
// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
// we can post nested object i.e // Nested Object = { person: { name: cw } }
// extended true : allow req-body value as a json or string and array or any type
// extended false : allow req-body value as string or array only

// app.use take two para 1)path(optional)2) middleware fuction
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// swagger-ui
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc, option));

// Conneting To the Database
const connection = require("./config/database.config.js");
connection.database();

// define a simple route
app.get("/", (req, res) => {
  res.json({ Welcome: "Welcome to the Fundoo Notes App !" });
});

// Require Notes routes

require("./routes/user.routes.js")(app);

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

module.exports = app;
