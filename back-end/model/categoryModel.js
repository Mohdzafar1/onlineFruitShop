const mongoose = require("mongoose");

const productCatSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
    },
})

const ProductCat = mongoose.model("Category", productCatSchema);
module.exports = ProductCat;
