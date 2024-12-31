const express = require("express")
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../multer/murlter");
const localSt = require("../middleware/passport");
const passport = require("passport");


route.get("/",ctl.login);
route.post("/userLogin",passport.authenticate("local",{failureRedirect:"/"}),ctl.userLogin);
route.get("/Dashboard",passport.checkAuth, ctl.Dashboard);
route.get("/addadmin",passport.checkAuth,ctl.Addadmin);
route.get("/viewadmin",passport.checkAuth,ctl.Viewadmin);

route.post("/send",multer,ctl.AddAdminData);
route.get("/delete",ctl.DeleteData)
route.get("/edit",ctl.EditData);
route.post("/update",multer,ctl.UpdateData);
route.get("/logout",ctl.logout);




module.exports = route