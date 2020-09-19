const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./User");
db.role = require("./role.model");
db.product = require("./Product");
db.recla = require("./recla.model");
db.resetpassword = require("./resetPassword")
db.ROLES = ["user", "admin", "moderator"];

module.exports = db ;