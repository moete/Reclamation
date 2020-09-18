
module.exports = function(app) {
  const AreaController = require("../controllers/Areas.controller")

  var router = require("express").Router()
  
        
router.post('/add', AreaController.addArea)
router.get("/number",AreaController.getAreasWithCount)
app.use('/api/area',router)

}



