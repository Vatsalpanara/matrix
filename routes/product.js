const express = require("express");
const rout = express.Router();
const ctl5 = require("../controller/proCtl");
const multer = require("../multer/murlter")

rout.get("/addproduct",ctl5.AddProduct)
rout.post("/AddProductData",multer,ctl5.AddProductData)
rout.get("/viewproduct",ctl5.ViewProduct)
rout.get("/deleteproduct",ctl5.DeleteProduct)
rout.get("/editeproduct",ctl5.EditeProduct)
rout.post("/updateproduct",multer,ctl5.UpdateProduct)


module.exports = rout