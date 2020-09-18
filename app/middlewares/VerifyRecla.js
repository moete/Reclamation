const db = require("../models");
const STATUS =db.status ;

checkStatusExisted = (req,res, next) => {

    if(req.body.status) {
      for (let i = 0; i < req.body.status.length; i++) {
        if (!ROLES.includes(req.body.status[i])) {
          res.status(400).send({
            message: `Failed! Statut ${req.body.status[i]} does not exist!`
          });
          return;
        }
      }
    }
  }

  module.exports = {checkStatusExisted}