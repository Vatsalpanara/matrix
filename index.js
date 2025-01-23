const express = require("express")
const port = 7000;
const path = require("path");
const cookies = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const db = require("./config/db");
const passport = require("./middleware/passport");
const session = require("express-session");
const connectFlash = require("./middleware/fiashconnect")

app.use(express.urlencoded());
app.use(flash());
app.set("view engine","ejs");

app.use(
    session({
        name: "local",
        secret: "local",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 100 * 100 * 60, httpOnly: true},
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(connectFlash.setFlash);

app.use("/",require("./routes/route"))
app.use("/category",require("./routes/category"))
app.use("/subcategory",require("./routes/subcategory"))
app.use("/product",require("./routes/product"))

app.use("/public",express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started at :- " + port);    
})
