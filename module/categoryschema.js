const mongoose = require("mongoose");

const schema = mongoose.Schema({
    cname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true,
    }
});

const category = mongoose.model("Category", schema);
module.exports = category;
