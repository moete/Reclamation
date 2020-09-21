const ReclaController = require("../controllers/recla.controller")
const mongoose = require("mongoose")
const authetificate = require("../controllers/auth.controller")

module.exports = function (app)  {

    var router = require("express").Router()

 // add Reclamation to DB
 router.post("/addRecla",(req,res)=> {
     ReclaController.addRecla(req,res)
 })
   
   
   
   
    app.use('/api/recla/',router)

}