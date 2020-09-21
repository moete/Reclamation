const mongoose = require("mongoose")

const Status = mongoose.model (
    "Status",
    new mongoose.Schema({
        type : String
    })
)
module.exports = Status