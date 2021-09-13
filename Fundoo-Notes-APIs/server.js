const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('../Fundoo-Notes-APIs/config/database.config');

//object of express 
const app = express();

// define a simple route
app.get('/',(req, res) =>{
    res.json({"message": "Welcome to Fundoo-Notes-Application"});
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());

// connecting to the database
mongoose.Promise = global.Promise;

//mongoose connect method help us to connect with DB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() =>{
    console.log("sucessfully connected to the database");
}).catch( err => {
    console.log("Could not connect to the database. Exiting now..", err);
    process.exit();
});

// function to check server is listing or not
function serverCheck (){
    console.log("server is listening on port 3000");
}

// listen for requests
app.listen(3000,serverCheck );