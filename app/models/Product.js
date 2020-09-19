    const mongoose = require("mongoose")

    const Product = mongoose.model(
      "Product",
      new mongoose.Schema(
        {

        ProdName: {
            type:String,
            required: true
        },
        ProdType:{ 
            type : String,
            required:true
        },
        ProdDesc: {
        type :String,
        required:true
        },
        ProdImg : 
        {
            data: Buffer,
            contentType: String
        },
        
    },
        
      )
    );
    module.exports = Product;
  
  
  
