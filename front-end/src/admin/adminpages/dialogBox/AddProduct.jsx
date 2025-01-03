import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { addProduct } from '../../../apiClient/endPoint';

const AddProduct = ({ setModalOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    product_image: null,
    price: '',
    category: '',
    subCategory: '',
    weights: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("sadsadsad",e.target.files[0])
    if (file) {
        setFormData({
            ...formData,
            product_image: file,
        });
    } else {
        console.error("No file selected or invalid file input.");
    }
};

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    form.append("weights", formData.weights);
    form.append("product_image", formData.product_image);
  
    try {
      const response = await addProduct(form); // Send FormData
      console.log('Response:', response);
      setModalOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };
  
  
  
  
  
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Add Product</h3>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 focus:outline-none"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
              />
            </div>

            {/* Product product_image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Product product_image</label>
              <input
                type="file"
  name="product_image"
  accept="image/*"
                onChange={handleFileChange}

                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
              >
                <option value="" disabled>Select Category</option>
                <option value="fruit">Fruit</option>
                <option value="veg">Vegetable</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
              >
                <option value="" disabled>Select Sub-Category</option>
                {["mango", "apple", "cherry", "banana", "grapes", "papaya", "guava"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <select
                name="weights"
                value={formData.weights}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2.5"
              >
                <option value="" disabled>Select Weight</option>
                {["250g", "500g", "1Kg", "2Kg", "3Kg", "4Kg", "5Kg", "1Pc", "2Pc", "4Pc", "6Pc", "12Pc"].map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
