const mongoose = require("mongoose");

//below is the schema used to create a new user
//so he/she can be added to the database.
const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  googleID: {
    type: String,
    required: false
  },
  githubID:{
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Users", Userschema);
