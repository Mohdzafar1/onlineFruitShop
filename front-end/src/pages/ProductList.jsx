import { useState } from "react";
import { FaShoppingCart, FaPlusSquare } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../store/slices/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) =>
      state.products?.productFilterAll || state.products?.productAll || []
  );

  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  
  const addToCart = (item) => {
    const updatedQty = quantities[item._id] || 1; // Default to 1 if no quantity is set
    const updatedItem = {
      ...item,
      qty: updatedQty, // Ensure the quantity matches the local state
    };
    console.log("updatedItem", updatedItem);
    dispatch(getCartProducts(updatedItem));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item._id]: updatedQty, // Sync the local state
    }));
  };

  const handleIncre = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + 1,
      };
      const updatedItem = products.find((product) => product._id === productId);
      dispatch(
        getCartProducts({
          ...updatedItem,
          qty: updatedQuantities[productId],
        })
      );
      return updatedQuantities;
    });
  };


  const handleDecre = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
      };
      const updatedItem = products.find((product) => product._id === productId);
      if (updatedQuantities[productId] > 0) {
        dispatch(
          getCartProducts({
            ...updatedItem,
            qty: updatedQuantities[productId],
          })
        );
      }
      return updatedQuantities;
    });
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
              <span className="text-xs border rounded px-1 py-1 mx-0">
                {product?.weights}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold">Rs. {product.price}</span>
              {quantities[product._id] ? (
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDecre(product._id)}>
                    <FaSquareMinus size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="qty"
                    value={quantities[product._id]}
                    readOnly
                    className="w-8 h-6 text-center"
                  />
                  <button onClick={() => handleIncre(product._id)}>
                    <FaPlusSquare size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add</span>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
