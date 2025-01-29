const User = require("../model/user")
const bcrypt= require("bcrypt")
const jwt = require('jsonwebtoken');




exports.registration = async (req, res) => {
    try {
        const { name, email, password, phone, isAdmin } = req.body;

        // Check if user already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
    
        const hastPassword=await bcrypt.hash(password,10)
         
        // Create new user
        const newUser = await User.create({
            name,
            email,
            password:hastPassword,
            phone,
            isAdmin: isAdmin || false, // Default to false if not provided
        });

        return res.status(201).json({
            message: "Registered successfully",
            status:true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.login =async(req,res)=>{
    try{
   console.log("req564",req.body)
     const{email,password}=req.body
     const existUser=await User.findOne({email})
     console.log("existUser**",existUser)
     if(!existUser){
      return res.status(404).json({message:"User not found"})
     }
     
     const inValidPassword=await bcrypt.compare(password,existUser.password)
     if(!inValidPassword){
       return res.status(404).json({message:"credential not match"})
     }

     const token = jwt.sign(
      { id: existUser._id, email: existUser.email }, // Payload
      process.env.JWT_SECRET, // Secret key from environment variables
      { expiresIn: '1h' } // Token expiration time
    );

     return res.status(201).json({message:"login successfully",token,status:true,email: existUser.email,isAdmin:existUser.isAdmin})

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getSingleUser=async(req,res)=>{
  try{
  //  const{email}=req.body
  const { email } = req.query;
   console.log("email",email)
   const existUser=await User.findOne({email})
   console.log("existUser",existUser)
   if(!existUser){
    return res.status(404).json({message:"User not found"})
   }

   return res.status(200).json({message:"fetching user",user:existUser})

  }catch (error) {
      res.status(500).json({ message: "Error updating user.", error: error.message });
    }
}

exports.userAddress = async (req, res) => {
    try {
      const { userId, address, houseNo, landMark } = req.body;
  
      // Check if the required fields are provided
      if (!userId || !address || !houseNo) {
        return res.status(400).json({ message: "userId, address, and houseNo are required." });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update or add the address details
      user.addressDetails = {
        address,
        houseNo,
        landMark,
      };
  
      // Save the updated user details
      await user.save();
  
      res.status(200).json({
        message: "updated successfully!",
        addressDetails: user.addressDetails,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating address.", error: error.message });
    }
};
  

exports.updateUser = async (req, res) => {
  try {
    // Extract `id` from query parameters
    const { id } = req.query; // Correctly extract the `id` as a string
    const updateData = req.body; // Data to update

    // Validate `id`
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Validate `updateData`
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided." });
    }

    // Find and update the user
    const user = await User.findByIdAndUpdate(
      id,                      // User ID
      { $set: updateData },    // Update only the provided fields
      { new: true, runValidators: true } // Return updated document and validate updates
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with success
    res.status(200).json({
      message: "User updated successfully!",
      user,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error updating user.", error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const existUser = await User.find();
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Fetching users", users: existUser });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users.", error: error.message });
  }
};

  