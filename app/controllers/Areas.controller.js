const express = require("express")
const app = express();
const mongoose = require("mongoose");
const Area = require("../models/Areas")
const Recla = require("../models/recla.model");
const webpush = require("web-push");


app.use(express.json())
module.exports = {
     addArea (req,res) {
        if (!req.body.name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
            Area.create({name : req.body.name} , (error,data) => {
                if(error) {
                    res.send(error)
                } else {
                    res.send(data._id)
                }
            })
          }
     ,
     getAreasWithCount (req,res) {
         Area.updateMany(
             {},
             {
                 $set : {
                     countRecla: 0  // pour initialiser tous les states 0 recla
                 }
             }
         ).then(() => {
             today = new Date()
             today.setHours(0,0,0,0)
             return Recla.find({state : 1})
         }).then(async demandes => {
             let a = await Array()
             for (let i=0; i<reclas.length; i++) {
                 let recla = reclas[i]
                 a[i] = Ar
                 ea.updateOne(
                     { name : recla.zone.trim() },
                     {
                         $inc : {
                             countRecla: 1
                         }
                     }
                 )
                 .then ( ai => console.log(ai.n))
             }
             return a ;
         })
         .then ( a => {
             return Area.find({})
         })
         .then(areasFound => {
            let result = {
              faible: [],
              moyen: [],
              grave: []
            };
         result.faible = areasFound.filter(el => el.countRecla <= 10)
         result.moyen = areasFound.filter(
             el => el.countRecla > 10 && el.countRecla < 30
         ) 
         result.grave = areasFound.filter( el => el.countRecla > 30)
         res.setHeader("Content-Type","application/json")
         res.json({
             success: true , 
             data : result
         }) 
        })
        .catch( e => res.json({err : e.message}))

    }
}