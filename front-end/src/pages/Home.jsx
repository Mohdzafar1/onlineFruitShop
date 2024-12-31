import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import ProductList from './ProductList'
import { FaFilter } from 'react-icons/fa'
import { getAllProduct } from '../apiClient/endPoint'
import { getAllProducts } from '../store/slices/productSlice'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch=useDispatch()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    const getAllProductList = async () => {
      try {
        const resp = await getAllProduct();
        dispatch(getAllProducts(resp))
      } catch (error) {
        console.error(error);
      }
    };
  

    useEffect(() => {
      getAllProductList();
    }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Filter />
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <FaFilter className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto">
                      <Filter />
                    </div>
                    {/* <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        Close
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="flex-1">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
