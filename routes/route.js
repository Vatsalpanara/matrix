const express = require("express")
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../multer/murlter");
const passport = require("passport");
const localSt = require("../middleware/passport");

route.get("/", ctl.Login);
route.post("/userLogin",passport.authenticate("local", {failureRedirect: "/"}),ctl.userLogin);
route.get("/logout",ctl.Logout);
route.get("/dashboard",passport.checkAuth, ctl.HomePage);
route.get("/addadmin",passport.checkAuth,ctl.Addadmin);
route.get("/viewadmin",passport.checkAuth,ctl.Viewadmin);
route.get("/profile",passport.checkAuth,ctl.Profile);
route.get("/changepassword",passport.checkAuth,ctl.changepassword);
route.post("/changepass",passport.checkAuth,ctl.changepass);
route.post("/forgotpass",ctl.forgotPass);
route.post("/checkpass",ctl.checkpass);
// route.get("/checkpass",ctl.chekpassword);


route.post("/send",multer,ctl.AddAdminData);
route.get("/delete",ctl.DeleteData);
route.get("/edit",ctl.EditData);
route.post("/update",multer,ctl.UpdateData);


module.exports = route