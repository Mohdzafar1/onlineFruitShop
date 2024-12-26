"use client";

import { useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

const Cart = () => {
  const allProducts = [
    {
      id: 1,
      name: "Hoodie with pouch pocket",
      size: "M / S",
      price: 6000.0,
      quantity: 1,
      category: "Clothing",
      subCategory: "Hoodies",
    },
    {
      id: 2,
      name: "Casual T-shirt",
      size: "L",
      price: 1500.0,
      quantity: 1,
      category: "Clothing",
      subCategory: "T-shirts",
    },
    {
      id: 3,
      name: "Running Shoes",
      size: "8 UK",
      price: 4500.0,
      quantity: 1,
      category: "Footwear",
      subCategory: "Shoes",
    },
    {
      id: 4,
      name: "Jeans with stretch",
      size: "32",
      price: 2500.0,
      quantity: 1,
      category: "Clothing",
      subCategory: "Jeans",
    },
    {
      id: 5,
      name: "Sports Jacket",
      size: "L",
      price: 5500.0,
      quantity: 1,
      category: "Clothing",
      subCategory: "Jackets",
    },
    {
      id: 6,
      name: "Sunglasses",
      size: "One Size",
      price: 2000.0,
      quantity: 1,
      category: "Accessories",
      subCategory: "Eyewear",
    },
    {
      id: 7,
      name: "Backpack",
      size: "20L",
      price: 3000.0,
      quantity: 1,
      category: "Accessories",
      subCategory: "Bags",
    },
  ];

  const [items, setItems] = useState(allProducts.slice(0, 5));
  const [visible, setVisible] = useState(5);

  const updateQuantity = (id, change) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const loadMore = () => {
    setVisible((prev) => prev + 5);
    setItems(allProducts.slice(0, visible + 5));
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 100.0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Product List */}
      <div className="col-span-2 space-y-6">
        <h1 className="text-2xl font-semibold mb-6">Your Products</h1>
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">
                    Category: {item.category} - {item.subCategory}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                <div className="font-medium text-lg">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visible < allProducts.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Summary Container */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-4 h-fit">
        <h2 className="text-lg font-medium mb-4">Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between font-medium text-lg border-t pt-4">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-3 mt-6 rounded-md hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
