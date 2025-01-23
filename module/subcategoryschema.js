const mongoose = require("mongoose")

const schema =mongoose.Schema({
    sname:{
        type : String,
        required : true
    },
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    }
   
})

let subcategory = mongoose.model("SubCatSchema",schema)

module.exports = subcategory