'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const Quotes = require("./models/quote.js");
const config = require('./config/config.js');

const app = express();
const router = express.Router();
const path = require("path")





// Basic Configuration
const PORT = process.env.PORT || 5000;
;
/** this project needs a db !! **/
 mongoose.connect(config.DBHost, {useNewUrlParser: true});

 let db = mongoose.connection;

 db.once("open", () => console.log("connected to the database"));

 // checks if connection with the database is successful
 db.on("error", console.error.bind(console, "MongoDB connection error:"));


 app.get("/api/getQuotes", (req, res) => {
   Quotes.find((err, data) => {
     if (err) return res.json({ success: false, error: err });
     return res.json({ success: true, data: data });
   });
 });


 if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// launch our backend into a port
var server = app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

module.exports = server
