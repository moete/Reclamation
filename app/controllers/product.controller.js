
const Product = require("../models/Product")
exports.create = (req, res,next) => {
    // Validate request
  
 let product = new Product ({
   
    ProdName: req.body.ProdName,
    ProdType: req.body.ProdType,
    ProdDesc: req.body.ProdDesc,

 })
 console.log(product)
 product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll = (req,res) => {
Product.find()
.then(data => {
    res.send(data)
     } )
     .catch(err => {
         res.status(500).send({
             message:
             err.message || "Some error occured while retrieving products "
         })
     })
}
exports.findOne = (req,res) => {
    const ref=req.params.ref
    Product.findById(ref)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found product with this ref " + ref });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving product with this ref " + ref });
    });
}
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const ref = req.params.ref
    Product.findByIdAndUpdate(ref, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + ref
      });
    });}
exports.delete = (req, res) => {
        const ref = req.params.ref;
      
        product.findByIdAndRemove(ref)
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Product with ref=${ref}. Maybe Tutorial was not found!`
              });
            } else {
              res.send({
                message: "Product was deleted successfully!"
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Product with ref=" + ref
            });
          });
      };

exports.deleteAll = (req, res) => {
        Product.deleteMany({})
          .then(data => {
            res.send({
              message: `${data.deletedCount} products were deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all tutorials."
            });
          });
      };