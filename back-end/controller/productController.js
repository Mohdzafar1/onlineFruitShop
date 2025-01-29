const Product = require("../model/productModel");
// const {Redis} =require("ioredis")


// const redisClient=new Redis()



exports.addProduct = async (req, res) => {
    try {
      console.log("Body:", req.body);
      console.log("File:", req.files);
      
        const { name, price, weights, category, subCategory } = req.body;
        console.log("file",req.files)
          
        let productImageUrl;
         if (req.files) {
            productImageUrl = `/images/${req.files.filename}`;
        } else {
            return res.status(400).json({ message: "Product image is required" })
        }
        console.log("body1",)
         // if (!product_name || !product_price || !product_weights || !product_category || !product_subCategory){
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




exports.getProduct = async (req, res) => {
    try {
      const url = req.protocol + "://" + req.get("host");
      
      // Check Redis cache
      // const cachedData = await redisClient.get('getProduct');
      // if (cachedData != null) {
      //   return res.status(200).json(JSON.parse(cachedData)); // Return success status code
      // }
  
      // Fetch products from the database
      const productList = await Product.find();
  
      // Update product image URLs
      productList.forEach((img) => {
        img.product_image = `${url}/public${img.product_image}`;
      });
  
      // Cache the data in Redis with a 1-hour expiration
      // await redisClient.set('getProduct', JSON.stringify(productList), 'EX', 3600);
  
      return res.status(200).json({ message: "Products retrieved successfully", productList });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

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