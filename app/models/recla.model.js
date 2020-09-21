const mongoose = require("mongoose")
const Status = require("./status.model")

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
        ReclaDesc :{
            type : String,
            required : true
        },
        products : [
        {
            ProdRef : {
                type :  String,
                required : true,
              },
              ProdName: String,
              ProdType: String,
              ProdDesc: String,
              ProdImg : String
              }
        
    ],
        Status : [
            {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Status",
        default:"Broken"
            }
                ]

        }
    )
)
module.exports = Recla