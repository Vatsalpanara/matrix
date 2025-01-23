const express = require("express")
const route = express.Router();
const ctl2 = require("../controller/categoryCtl");
const passport = require("passport");
const localSt = require("../middleware/passport");
const catmulter = require("../multer/murlter")

route.get("/addCat", ctl2.addcat);
route.post("/sendCat",catmulter,ctl2.SendCat);
route.get("/viewcat",passport.checkAuth,ctl2.Viewcat);
route.get("/deleteCat",ctl2.deletecat);
route.get("/edit",ctl2.editdata);
route.post("/updatecat",catmulter,ctl2.updatecat);






module.exports = route