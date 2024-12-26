import { useState } from 'react'
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

// import Image from "next/image"

const  Navbar=()=> {
  const[openProfile,setOpenProfile]=useState(false)
  const history=useNavigate()
   const handleProfile=()=>{
    setOpenProfile(true)
    history("/profile")
   }

   const handleLogout=()=>{
     localStorage.removeItem("Auth_Token")
     history("/")
   }


  return (
   <>
      <nav className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex flex-rows">
            <img 
              src="https://media.lordicon.com/icons/wired/flat/543-apple.gif" 
              alt="FRUGIVORE" 
              width={150} 
              height={50}
              className="h-12 w-auto"
            />
             <div>
             <span className='pt-3 font-bold'>MyShop</span>
             <p className='pt text-xs'>kichha online Fruit Shop</p>

             </div>
          </div>

          {/* Delivery Info */}
          <div className="hidden md:block bg-gray-100 rounded-md px-4 py-2">
            {/* <div className="text-sm">
              <p className="text-gray-600">
                Order by : <span className="font-medium text-gray-900">07:00 PM, Today</span>
              </p>
              <p className="text-gray-600">
                Get it in between : <span className="font-medium text-gray-900">08:00 AM - 11:00 AM, Tomorrow</span>
              </p>
            </div> */}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors">
                <FaSearch className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaUser className="h-6 w-6 text-gray-600" onClick={handleProfile}/>
            </button>
            <Link  to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <FaShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
   </>
  )
}

export default Navbar

