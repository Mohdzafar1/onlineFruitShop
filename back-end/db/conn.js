const mongoose = require("mongoose");



const URL = process.env.DataBase

mongoose.connect(URL)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });
