const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Recla = require("../models/Reclamation")
const webpush = require("web-push");
app.use(express.json());


module.exports = {
    addRecla(req,res) {
        keys = Object.keys(req.body)
        if(
            !keys.includes("cin") ||
            !keys.includes("reason") ||
            !keys.includes("where") ||
            !keys.includes("zone")  ||
            keys.length !==4
        ) 
        {
           res.status(422)
           res.setHeader("Content-Type","application/json")
           res.json({
               err: "invalid data"
           })
        }
        else {
            Recla.find({ cin: req.body.cin, state: 1 })
              .then(async resp => {
                if (!resp.length) {
                  let score = await getScore(req.body);
                  if (score == -1) {
                    res.json({
                      err: "can't get score! try again!"
                    });
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
    else {
        res.status(409);
        res.setHeader("Content-Type", "application/json");
        res.json({
          err: "there is already a demand"
        });
      }
    })
    .catch(err => {
        res.json({err : err.message})
    })

        }
 }
 

}
async function getScore(demande) {
    var result = -1;
    let dmd;
    dmd = await Recla.find({ state: 1, zone: demande.zone }, (err, res) => {
      if (err) res.json({ err: err.message });
      else {
        result = res.length;
      }
    });
    if (dmd) return result;
  }