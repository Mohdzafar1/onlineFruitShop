const mongoose = require("mongoose");

const productSubCatSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
    },
})

const ProductSubCat = mongoose.model("SubCategory", productSubCatSchema);
module.exports = ProductSubCat;
