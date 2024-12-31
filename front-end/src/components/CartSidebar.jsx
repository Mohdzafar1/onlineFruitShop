import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const CartSidebar = ({ handleCloseCart, onUpdateQuantity }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.carts?.cartProduct || []);
  
  const [cartItems, setCartItems] = useState(cartData);

  // Update local cart items when Redux cart changes
  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  // Update item quantity
  const handleQuantityChange = (productId, newQty) => {
    console.log("newQty",newQty,productId)
    if (newQty < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, qty: newQty } : item
    );
    console.log("updatedCart",updatedCart)
    setCartItems(updatedCart);
  };

  // Calculate totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryCharge = 25;
  const handlingCharge = 4;
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge;
  const savedAmount = cartItems.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price + 10) - item.price) * item.qty,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
        onClick={handleCloseCart}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button
            onClick={handleCloseCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-2 p-4 bg-gray-50">
          <BsClock className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold">Delivery in 12 minutes</p>
            <p className="text-sm text-gray-600">Shipment of {cartItems.length} item(s)</p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 py-4 border-b">
              <img
                src={item.product_image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.weights}</p>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold">₹{item.price}</span>
                    {(item.price + 10) > item.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{item.price + 10}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="border-t p-4 space-y-4">
          <h3 className="font-semibold">Bill details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items total</span>
              <div>
                <span>₹{itemsTotal}</span>
                {savedAmount > 0 && (
                  <span className="text-green-600 ml-2">Saved ₹{savedAmount}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <span>Delivery charge</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between">
              <span>Handling charge</span>
              <span>₹{handlingCharge}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Grand total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <div className="p-4 border-t">
          <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors">
            Login to Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
