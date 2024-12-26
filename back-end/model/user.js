const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    addressDetails: {
    address: { type: String, required: false },
    houseNo: { type: String, required: false },
    landMark: { type: String, required: false },
  },
    orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
  ],
    isAdmin: {
        type: Boolean,
        default: false, // Default to non-admin users
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
