import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../../apiClient/endPoint';
import AddProduct from './dialogBox/AddProduct';

const ProductList = () => {

  const [products, setProduct] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

 console.log("products654",products)
  const getAllProductList = async () => {
    try {
      const resp = await getAllProduct();
      console.log("resp", resp);
      setProduct(resp);
      

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProductList();
  }, []);

  return (
    <>
       <div className="px-0 sm:px-8">
      <div className="py-3">
      <div className="mb-4 flex justify-between items-center">
  <h2 className="text-2xl font-semibold leading-tight">Product List</h2>
  <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-gray-500 text-white font-medium text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
  Add
</button>

</div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <div className='max-h-96 overflow-y-auto'>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Price
                </th> */}
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sub-Category
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((pro) => (
                <tr key={pro.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full" src={pro.product_image} alt={pro.name} />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {pro.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${pro.price}</p>
                  </td>
                  {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${pro.totalPrice}</p>
                  </td> */}
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{pro.category}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{pro.subCategory}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

      </div>
    </div>
    {isModalOpen && (
   <AddProduct setModalOpen={setModalOpen}/>
      )}


    </>
  )
}

export default ProductList