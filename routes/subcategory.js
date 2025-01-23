const express = require("express")
const rout = express.Router()
const ctl3 = require("../controller/subcategoryCtl")

rout.get("/subaddcat",ctl3.AddSubCat)
rout.post("/SendSubCat",ctl3.SendSubCat)
rout.get("/subviewcat",ctl3.ViewSubCat)

rout.get("/deleteSubCat",ctl3.subdeletecat);
rout.get("/editsubcat",ctl3.subeditdata);
rout.post("/updatesubcat",ctl3.updatesubcat);


module.exports = rout