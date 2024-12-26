const ProductCat = require("../model/categoryModel");




exports.addProductCategory = async (req, res) => {
    try {
        const { name} = req.body;

        const addProductCat = await ProductCat.create({name});

        return res.status(201).json({ message: "Product added successfully", productCat: addProductCat });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.getProductCategory =async(req,res)=>{
    try{
    
        
        const productCatList =await ProductCat.find()
     
    return res.status(201).json({message:"category List",productCatList})
   
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}