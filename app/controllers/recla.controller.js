const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Recla = require("../models/recla.model")
const webpush = require("web-push");
app.use(express.json());


module.exports = {
    addRecla(req,res) {
        keys = Object.keys(req.body)
        if(
            !keys.includes("reason") ||
            !keys.includes("zone")  ||
            keys.length !==5
        ) 
        {
           res.status(422)
           res.setHeader("Content-Type","application/json")
           res.json({
               err: "invalid data"
           })
        }
        else {
            Recla.create({...req.body})
            .then(doc => {
                res.status(201)
                res.json({
                    success : true,
                    status : doc
                })
            })
            .catch(err => {
                res.json({err: err.message})
            })
        }
    }
}



























/*exports.addRecla = async (req,res) => {
   const productId = "5f621a585849670d8789f0f9"
   


console.log(authController.signin())

     // Validate request
     if (!req.body.reclaDesc) {
        res.status(400).send({ message: "Reclamation Description can not be empty!" });
        return;
      } 
      const decoded = decode(staticToken);
      userIdentifier=decoded.id
      const productDetails =  await Product.findById(productId);
      const recla = new Recla({
      userID: userIdentifier,
      product: productDetails,
      reclaDesc: req.body.reclaDesc,
      });

      
      try {
      recla
      .save(recla)
      .then(data => {
        res.send(data);
            })
            (err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Product."
                });
            })
        }
        catch(error) {
            console.error(error);
        }
        };
        */