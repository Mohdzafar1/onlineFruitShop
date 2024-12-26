const ProductSubCat = require("../model/productSubCatModel");



exports.addProductSubCategory = async (req, res) => {
    try {
        const { name} = req.body;

        const addProductCat = await ProductSubCat.create({name});

        return res.status(201).json({ message: "Product added successfully", productCat: addProductCat });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.getProductSubCategory =async(req,res)=>{
    try{
    
        
        const productCatList =await ProductSubCat.find()
     
    return res.status(201).json({message:"category List",productCatList})
   
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}