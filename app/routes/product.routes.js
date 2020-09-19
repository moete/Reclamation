const multer = require ("multer");
const upload = multer({dest : 'uploads/'})

module.exports = app => {
  const products = require("../controllers/product.controller")
  var router = require("express").Router()
    
  
    router.post("/add",products.create)

 /*   router.get("/",products.findAll)
    //router.get("/published",products.findAll)
    router.get(":/ref",products.findOne)
    router.put("/:ref",products.update)
    router.delete("/:ref",products.delete)
    router.delete("/deleteall",products.deleteAll) 
    */

    app.use('/api/products',router)
   
}