const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema(
 {
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })

User.plugin(passportLocalMongoose, {
  usernameField: "username",
  passwordField: "password"
});
module.exports = mongoose.model("User",User);