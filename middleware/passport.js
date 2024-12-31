const  passport = require("passport");
const  localSt = require("passport-local");

let AdminSchema = require("../module/firstschema");

passport.use(
    "local",
    new localSt({ usernameField: "email"},async(email,password,done)=>{
        let user = await AdminSchema.findOne({email:email});
        if(user){         
            if(user.password == password){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }else{
            return done(null,false);
        }
    })
);

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(userId,done)=>{
    let user = await AdminSchema.findById(userId);
    done(null,user);
})

passport.checkAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    res.redirect("/");
}