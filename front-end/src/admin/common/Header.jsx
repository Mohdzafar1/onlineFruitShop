import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaUserCircle } from 'react-icons/fa'

const Header = ({ activeMenu, setActiveMenu, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <FaBars className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">
          {(activeMenu === 'orders') ? 'Order List' : (activeMenu === 'users')? 'User List' :(activeMenu === 'products')? "Product List" : ""}
        </h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
            aria-label="Open user menu"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                User Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header