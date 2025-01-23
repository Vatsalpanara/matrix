const SubCatSchema = require("../module/subcategoryschema")
const CatSchema = require("../module/categoryschema")

module.exports.AddSubCat =async(req,res)=>{
    let data = await CatSchema.find({})
   data && res.render("subAddCat",{data})
}
module.exports.SendSubCat=async(req,res)=>{
    let data  = await SubCatSchema.create(req.body)
    data && res.redirect("/subcategory/subaddcat")
}
module.exports.ViewSubCat=async(req,res)=>{
    let data = await SubCatSchema.find({}).populate("categoryId");
    // console.log(data);
    data && res.render("subviewcat",{data})
}
module.exports.subdeletecat = async (req, res) => {
    let data = await SubCatSchema.findByIdAndDelete(req.query.id);
    data && res.redirect("/subcategory/subviewcat");
};
module.exports.subeditdata = async (req, res) => {
    let data = await CatSchema.find({});
    let datas = await SubCatSchema.findById(req.query.id).populate("categoryId");
    // console.log(data);
    // console.log(datas);
    data && res.render("editsub",{data , datas});
};
module.exports.updatesubcat = async (req, res) => {
    await SubCatSchema.findByIdAndUpdate(req.body.id,req.body)
    .then(()=>{
        res.redirect("/subcategory/subviewcat")
    })
};





