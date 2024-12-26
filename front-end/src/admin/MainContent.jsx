import React from 'react'
import OrderList from './adminpages/OrderList'
import UsersList from './adminpages/UsersList'
import ProductList from './adminpages/ProductList'
import { useSelector } from 'react-redux'

const MainContent = ({activeMenu}) => {
  
  
  return (
    <div>
           <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
   
            <div className="bg-white rounded-lg shadow p-6">
              {(activeMenu==="orders") && <OrderList/>}
              {(activeMenu==="users") && <UsersList/>}
              {(activeMenu==="products") && <ProductList/>}

    </div>
    </main>
    </div>
  )
}

export default MainContent