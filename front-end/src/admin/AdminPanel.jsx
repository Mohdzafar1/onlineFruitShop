import { useState } from 'react'
import { FaShoppingCart, FaUsers, FaBars, FaTimes } from 'react-icons/fa'
import AdminSidebar from './common/AdminSidebar'
import Header from './common/Header'
import MainContent from './MainContent'

export default function AdminPanel() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('orders');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          toggleSidebar={toggleSidebar}
        />
        <MainContent activeMenu={activeMenu} />
      </div>
    </div>
  );
}