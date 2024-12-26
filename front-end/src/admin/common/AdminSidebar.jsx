import { FaShoppingCart, FaTimes, FaUsers } from "react-icons/fa";
import { PiListChecksLight } from "react-icons/pi";
const AdminSidebar = ({ activeMenu, setActiveMenu, toggleSidebar, isSidebarOpen }) => {
    const menuItems = [
      { id: 'orders', label: 'Order List', icon: <FaShoppingCart /> },
      { id: 'users', label: 'User List', icon: <FaUsers /> },
      { id: 'products', label: 'Product List', icon: <PiListChecksLight /> },

    ];
  
    return (
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 h-full`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className={`flex items-center px-4 py-3 transition-colors ${
                activeMenu === item.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    );
  };
  
  export default AdminSidebar;
  