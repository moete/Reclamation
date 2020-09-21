const db = require("../models")
const Recla = db.recla;
const decode = require("jwt-decode");
const Product = db.product;
const authController = require("../controllers/auth.controller")

const staticToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWZiOGRkZWQxN2MzMDkzYmIyNWU2NSIsInVzZXJuYW1lIjoidGF6eiIsImVtYWlsIjoidGF6ekBnbWFpbC5jb20iLCJyb2xlcyI6W3siX2lkIjoiNWY1ZTA4N2IyZmFiZDcxY2Q0MDc3Njc4IiwibmFtZSI6InVzZXIifV0sImlhdCI6MTYwMDI2MDM0MywiZXhwIjoxNjAwMzQ2NzQzfQ.LblRgXVPN_cK4L12Zk4NgXDacWsNOYWoeUc2Y9JkvMU"

exports.addRecla = async (req,res) => {
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