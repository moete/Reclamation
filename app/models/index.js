const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.status = require ("./status.model");
db.recla = require("./recla.model");
db.resetpassword = require("./resetPassword")
db.ROLES = ["user", "admin", "moderator"];
db.STATUS= ["Broken ","Inprogress" , "Fixed"]

module.exports = db ;