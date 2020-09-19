const mongoose = require("mongoose")

const Recla = mongoose.model(
    "Recla",
    new mongoose.Schema(
        {
        UserId : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
                 },
        CreatedAt : {
            type  : Date,
            default  : Date.now
                    },
        reason :{
            type : String,
            required : true
                   },
        products : { 
        type : mongoose.Schema.Types.ObjectId,
        ref: "Prod" 
                   },
        zone: String,
        Status :  {
            type : Boolean ,
            default: false
                  },
        state: {
            type: Number,
            default: 1
               }
    }

        
    )
)
module.exports = Recla