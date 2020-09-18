const mongoose = require("mongoose")

    const Product = mongoose.model(
      "Product",
      new mongoose.Schema(
        {
        ProdRef : {
          type :  String,
          required : true,
        },
        ProdName: String,
        ProdType: String,
        ProdDesc: String,
        ProdImg : String
        },
        
      )
    );
    module.exports = Product;
  
  
