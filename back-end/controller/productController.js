const Product = require("../model/productModel");





exports.addProduct = async (req, res) => {
    try {
        const { name, price, weights, category, subCategory } = req.body;

        let productImageUrl = null;
        if (req.files && req.files.product_image && req.files.product_image[0]) {
            productImageUrl = `/images/${req.files.product_image[0].filename}`;
        } else {
            return res.status(400).json({ message: "Product image is required" });
        }

        
         // if (!product_name || !product_price || !product_weights || !product_category || !product_subCategory) {
        //     return res.status(400).json({ message: "All fields are required." });
        // }

        const addProduct = await Product.create({
            name,
            product_image:productImageUrl,
            price,
            weights,
            category,
            subCategory,
        });

        console.log("Product added:", addProduct);
        return res.status(201).json({ message: "Product added successfully", product: addProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




exports.getProduct =async(req,res)=>{
    try{
     const url = req.protocol + "://" + req.get("host");
        
        const productList =await Product.find()
     
        productList.forEach((img)=>{
            img.product_image=`${url}/public${img.product_image}`
        })
    return res.status(201).json({message:"add new Product",productList})
   
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateProduct =async(req,res)=>{
    try{
     const{product_name,product_image,product_price, product_weights, product_category,product_subCategory}=req.body
    
     const productList =await Product.findById({id})

    if(productList) productList.product_name=product_name
    if(productList) productList.product_price=product_price
    if(productList) productList.product_weights=product_weights
    if(productList) productList.product_category=product_category
    if(productList) productList.product_subCategory=product_subCategory

 

    

    return res.status(201).json({message:"add new Product",productList})
   
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}