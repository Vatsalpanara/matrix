const express = require("express")
const port = 7000;
const path = require("path");
const db = require("./config/db");
const cookies = require("cookie-parser");
const fs =require("fs");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use(cookies());

app.use(
    session({
        name:"local",
        secret:"local",
        resave:true,
        saveUninitialized:false,
        cookie:{maxAge:100 * 100 * 60,httpOnly:true},
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/",require("./routes/route"))
app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started at :- " + port);    
})