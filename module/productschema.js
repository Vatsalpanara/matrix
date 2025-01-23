const mongoose = require("mongoose")

const schema = mongoose.Schema({
    productName:{
        type : String,
        required : true
    },
    image:{
        type:String,
        require:true
    },
    ProductId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"SubCatSchema",
        required: true
    },
    price:{
        type:String,
        required:true
    }
})

let Product = mongoose.model("ProductSchema",schema)

module.exports = Product