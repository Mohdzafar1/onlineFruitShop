const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    //  name: {
    //     type: String,
    //     required: true,
    // },
    // product_image:{
    //     type: String,
    //     required: true,
    // },
    price: {
        type: String,
        required: true,
    },
    weights: {
        type: String,
        required: true,
        enum:["1Kg","2Kg","3Kg","4Kg","5Kg","1pc","2Pc","3Pc","4Pc","5Pc"]
    },
    // category: {
    //     type:String,
    //     required:true,
    //     enum:["fruit","veg"]

    // },
    // subCategory:{
    //     type:String,
    //     required:true,
    //     enum:["mango","apple","cherry","banana"]

    // },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,

    },
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},


})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
