const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema(
 {
    cin:
    {
    type: String,
    required: true
    },
    name: 
    {
    type: String,
    required : true
    },    
    email:
    { 
    type: String,
    required : true
    },
  
    phone : {
    type : String,
    required : true
    },
    roles: 
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
      }
    ],
    area: {
      type: String,
      required: true
    }
  })

User.plugin(passportLocalMongoose, {
  usernameField: "cin",
  passwordField: "password"
});

module.exports = mongoose.model("User",User);