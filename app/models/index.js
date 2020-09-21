const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./User");
db.role = require("./Role");
db.product = require("./Product");
db.recla = require("./Reclamation");
db.resetpassword = require("./resetPassword")
db.ROLES = ["user", "admin", "moderator"];

module.exports = db ;