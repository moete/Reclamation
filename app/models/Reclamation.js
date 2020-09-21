const mongoose = require("mongoose")

const Reclamation = mongoose.Schema(
    
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
        where : String ,
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

module.exports = mongoose.model("Recla", Reclamation)