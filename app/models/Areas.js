const mongoose = require("mongoose");

const AreaSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  countRecla: {
    type: Number,
    default: 0
  },
  Gouvernorat: {
    type: String
  },
  cord: {
    type: Array
  }
});

module.exports = mongoose.model("Area", AreaSchema);