const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
    },
    product_image:{
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    weights: {
        type: String,
        required: true,
        enum:["250g","500g","1Kg","2Kg","3Kg","4Kg","5Kg","1Pc","2Pc","4Pc","6Pc","12Pc"]
    },
    category: {
        type:String,
        required:true,
        enum:["fruit","veg"]

    },
    subCategory:{
        type:String,
        required:true,
        enum:["mango","apple","cherry","banana","grapes","papaya","guava"]

    },

})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
