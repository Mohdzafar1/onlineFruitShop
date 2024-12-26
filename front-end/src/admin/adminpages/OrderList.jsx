import React from 'react'

const orders = [
  {
    id: 1,
    image: '/placeholder.svg?height=50&width=50',
    name: 'Wireless Earbuds',
    price: 79.99,
    totalPrice: 159.98,
    category: 'Electronics',
    subCategory: 'Audio'
  },
  {
    id: 2,
    image: '/placeholder.svg?height=50&width=50',
    name: 'Smart Watch',
    price: 199.99,
    totalPrice: 199.99,
    category: 'Electronics',
    subCategory: 'Wearables'
  },
  {
    id: 3,
    image: '/placeholder.svg?height=50&width=50',
    name: 'Yoga Mat',
    price: 29.99,
    totalPrice: 59.98,
    category: 'Sports',
    subCategory: 'Yoga'
  },
  {
    id: 4,
    image: '/placeholder.svg?height=50&width=50',
    name: 'Coffee Maker',
    price: 89.99,
    totalPrice: 89.99,
    category: 'Home',
    subCategory: 'Kitchen'
  },
]

const OrderList = () => {
    
  return (
    <div className="px-0 sm:px-8">
      <div className="py-3">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sub-Category
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full" src={order.image} alt={order.name} />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {order.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${order.price.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${order.totalPrice.toFixed(2)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order.category}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{order.subCategory}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderList