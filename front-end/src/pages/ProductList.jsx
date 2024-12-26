import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { getAllProduct } from "../apiClient/endPoint";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";


const ProductList = () => {

  const products= useSelector((state)=>state.products?.productFilterAll || state.products?.productAll || [])


  

  // Function to return weights based on product type
  const getWeights = (productName) => {
    if (productName.toLowerCase().includes("banana")) {
      return ["3pc", "6pc", "12pc"];
    } else {
      return ["1kg", "2kg", "3kg"];
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
          <div className="relative">
            <img
              src={product.product_image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-auto rounded-md"
            />
            {product.discount && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
            <p>Fruits are nature’s sweet and nutritious snacks</p>
            <div className="flex flex-wrap gap-2">
              {getWeights(product.name).map((weight) => (
                <span
                  key={weight}
                  className="text-xs border rounded px-1 py-1 mx-0"
                >
                  {weight}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">Rs. {product.price}</span>
              <button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FaShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
