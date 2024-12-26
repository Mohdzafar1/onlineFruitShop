const Order = require("../model/orderModel");
const User = require("../model/user"); // Assuming you have a User model

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log("rq",req.body)
    // const { userId, productId, name ,price, weights, category, subCategory } = req.body;
    const { userId, productId,price, weights } = req.body;

     console.log("userId",userId)
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const{product_image}=req.files
    // let productImageUrl = null;
    //     if (product_image && product_image && product_image[0]) {
    //         productImageUrl = `/images/${product_image[0].filename}`;
    //     } else {
    //         return res.status(400).json({ message: "Product image is required" });
    //     }
    // Create order
    const order = new Order({
      // name,
      // product_image:productImageUrl,
      price,
      weights,
      // category,
      // subCategory,
      productId,
      userId
    });

    await order.save();

    // Optional: Add order details to user's orders (if you track user orders)
    user.orders = user.orders || [];
    user.orders.push(order._id);
    await user.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};


exports.getAllOrder =async(req,res)=>{
  try{
   const url = req.protocol + "://" + req.get("host");
      
      const OrderList =await Order.find()
   
      // OrderList.forEach((img)=>{
      //     img.product_image=`${url}/public${img.product_image}`
      // })
  return res.status(201).json({message:"new order",OrderList})
 
  }catch(error){
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
}