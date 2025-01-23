const ProductSchema = require("../module/productschema")
const SubCatSchema = require("../module/subcategoryschema")
const fs = require("fs")

module.exports.AddProduct=async(req,res)=>{
    let data = await SubCatSchema.find({});
    data && res.render("addproduct",{data});
}
module.exports.AddProductData=async(req,res)=>{
    req.body.image = req.file.path
    let data = await ProductSchema.create(req.body)
    data && res.redirect("/product/addproduct")
    
}

module.exports.ViewProduct=async(req,res)=>{
    let data = await ProductSchema.find({}).populate({
        path: "ProductId",
        populate:{
            path: "categoryId"
        }
    });
    // console.log(data);
    data && res.render("viewproduct",{data})
}

module.exports.DeleteProduct = async (req, res) => {
    let data = await ProductSchema.findByIdAndDelete(req.query.id);
    data && res.redirect("/product/viewproduct");
};

module.exports.EditeProduct = async (req, res) => {
    let data = await ProductSchema.findById(req.query.id);
    data && res.render("editcat",{data});
};

module.exports.EditeProduct = async (req, res) => {
    let data = await SubCatSchema.find({});
    let datas = await ProductSchema.findById(req.query.id).populate("ProductId");
    // console.log(data);
    // console.log(datas);
    data && res.render("editproduct",{data , datas});
};

module.exports.UpdateProduct = async (req, res) => {
    console.log(req.body);
  await ProductSchema.findByIdAndUpdate(req.body.id,req.body)
    .then(()=>{
        res.redirect("/product/viewproduct")
    })   
};