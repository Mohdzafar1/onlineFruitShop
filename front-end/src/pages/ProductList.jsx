import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaPlusSquare } from 'react-icons/fa';
import { FaSquareMinus } from 'react-icons/fa6';
import { addToCart, deleteProductReducer, updateQuantity } from '../store/slices/cartSlice';
import {showSuccessToast } from '../helper/toast';


const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.cartProduct);
  const products = useSelector(
    (state) =>
      state.products?.productFilterAll || state.products?.productAll || []
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showSuccessToast("Add in cart")
  };

  const handleQuantityChange = (productId, newQty) => {
    if (newQty < 1) {
      dispatch(deleteProductReducer(productId));
    } else {
      dispatch(updateQuantity({ productId, qty: newQty }));
    }
  };

  const getProductQuantity = (productId) => {
    const product = cartItems.find((item) => item._id === productId);
    return product ? product.qty : 0;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => {
        const quantity = getProductQuantity(product._id);
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
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
              <h3 className="text-sm font-medium line-clamp-2">
                {product.name}
              </h3>
              <p>Fruits are nature’s sweet and nutritious snacks</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs border rounded px-1 py-1 mx-0">
                  {product?.weights}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">Rs. {product.price}</span>
                {quantity > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(product._id, quantity - 1)
                      }
                    >
                      <FaSquareMinus size={20} />
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-8 h-6 text-center"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(product._id, quantity + 1)
                      }
                    >
                      <FaPlusSquare size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaShoppingCart className="h-4 w-4" />
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
