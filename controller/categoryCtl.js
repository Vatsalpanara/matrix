const CatSchema = require("../module/categoryschema");
const mailer = require("../middleware/mail");
const fs = require("fs");


module.exports.addcat = (req,res) => {
    res.render("addCat");
};
module.exports.SendCat=async(req,res)=>{
    req.body.image = req.file.path
    let data = await CatSchema.create(req.body)
    data && res.redirect("/category/addCat",)
}
module.exports.Viewcat =async(req,res) => {
    let data = await CatSchema.find({})
    data && res.render("viewcat",{data});
}
module.exports.deletecat = async (req, res) => {
    let singleRecord = await CatSchema.findById(req.query.id);
    fs.unlinkSync(singleRecord.image); 
    let data = await CatSchema.findByIdAndDelete(req.query.id);
    data && res.redirect("/category/viewcat");
};
module.exports.editdata = async (req, res) => {
    let data = await CatSchema.findById(req.query.id);
    data && res.render("editcat",{data});
};
module.exports.updatecat = async (req, res) => {
    let img = "";
    let SingleData = await CatSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = SingleData.image
    req.file && fs.unlinkSync(SingleData.image)
    req.body.image = img
    let data = await CatSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/category/viewcat");
};

