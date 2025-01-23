const AdminSchema = require("../module/firstschema");
const fs = require("fs")
const mailer = require("../middleware/mail")

module.exports.Login = (req,res) => {
    res.render("Login");
}

module.exports.userLogin = async (req, res) =>{
    // console.log(req.body);
    
    let admin = await AdminSchema.findOne({email: req.body.email});
    // console.log(admin);
    req.flash( "success" , "You are successfully logged in")
    res.redirect("/Dashboard");
    
   
};

module.exports.Logout = (req,res)=>{
    req.session.destroy();
    res.clearCookie("local");
    res.redirect("/");
}

module.exports.HomePage = async(req,res) =>{
    res.render("Dashboard");
}
module.exports.chekpassword = async(req,res) =>{
    res.render("chekpassword");
}

module.exports.Addadmin =async(req,res) => {
    res.render("addadmin");
    
}

module.exports.Viewadmin =async(req,res) => {
    let data = await AdminSchema.find({})
    data && res.render("viewadmin",{data});
}

module.exports.AddAdminData = async(req,res)=>{
    req.body.image = req.file.path;
    let data = await AdminSchema.create(req.body)
    data && res.redirect("/viewAdmin")
}
module.exports.DeleteData = async(req,res)=>{
    let SingleData = await AdminSchema.findById(req.query.id)
    fs.unlinkSync(SingleData.image);
    let data = await AdminSchema.findByIdAndDelete(req.query.id)
    data && res.redirect("/viewAdmin");
}
module.exports.EditData = async(req,res)=>{
    let data = await AdminSchema.findById(req.query.id)
    data && res.render("edit",{data})
}
module.exports.UpdateData = async(req,res)=>{
    let img = "";
    let SingleData = await AdminSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = SingleData.image
    req.file && fs.unlinkSync(SingleData.image)
    req.body.image = img
    let data = await AdminSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/viewAdmin");
}


module.exports.Profile = async(req,res) =>{
    res.render("profile");
}

module.exports.changepassword = async(req,res) =>{
    res.render("changepassword");
}

module.exports.changepass = async (req, res) => {
    
    let user = req.user;

    if(req.body.oldpass == user.password){
        
        if(req.body.newpass != user.password){

            if(req.body.newpass == req.body.confrompass){
                await AdminSchema.findByIdAndUpdate(user.id,{
                    password: req.body.newpass,
                });
                res.redirect("/");
            }

        }
        else{
            console.log("new password and confrom password different");
        }

    }
    else{
        console.log("old password is err");
    }
}

module.exports.forgotPass = async (req,res) => {
    console.log(req.body)
    let admin = await AdminSchema.findOne({ email: req.body.email });
    if(!admin){
        console.log("Email not found");
        return res.redirect("/")
    }
    let otp = Math.floor(Math.random() * 1000 + 9000);

    mailer.sendOtp(req.body.email,otp);

   

    req.session.otp = otp;
    req.session.adminData = admin;

    res.render("checkpass");
}

module.exports.checkpass = async(req,res)=>{
    let adminData = req.session.adminData;
    let otp = req.session.otp;
    if (req.body.otp == otp) {
        if (req.body.newpass == req.body.confrompass) {
            console.log(adminData._id);

            let change = await AdminSchema.findByIdAndUpdate(adminData._id,{
                password:req.body.newpass,
                
            });

            change && res.redirect("/");
            
        }else{
            console.log("password to be same");
            res.redirect("/checkpass")
        }
    }else{
        console.log("otp is wrong");
        res.redirect("/checkpass");
    }

};