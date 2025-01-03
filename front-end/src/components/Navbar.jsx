import { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllFilterProducts } from '../store/slices/productSlice';
import CartSidebar from './CartSidebar';

const Navbar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.productAll || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const[cartSide,setCartSide]=useState(false)
  const history = useNavigate();
  const cartData = useSelector((state) => state.carts?.cartProduct || []);

 
   const handleCloseCart=()=>{
    setCartSide(false)
   }

  const handleOpenCart=()=>{
    setCartSide(true)
  }

  const handleProfile = () => {
    setOpenProfile(true);
    history("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("Auth_Token");
    history("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    if (value.trim() === "") {
      dispatch(getAllFilterProducts(products));
    } else {
      const filtered = products.filter((item) => item.name.toLowerCase().includes(value));
      setFilteredProducts(filtered);
      console.log("filtered", filtered);
    }
  };

  useEffect(() => {
    dispatch(getAllFilterProducts(filteredProducts));
  }, [filteredProducts]);

  return (
    <>
      <nav className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://media.lordicon.com/icons/wired/flat/543-apple.gif"
                alt="FRUGIVORE"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              {/* Logo Text */}
              <div className="hidden sm:block">
                <span className="pt-3 font-bold">VitaFruitMarket</span>
                <p className="text-xs">Kichha Online Fruit Shop</p>
              </div>
            </div>

        

            {/* Search Bar */}
            <div className=" flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  name="name"
                  value={searchQuery}
                  onChange={handleSearch}
                  autoComplete="off"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors">
                  <FaSearch className="h-4 w-4" />
                </button>
              </div>
            </div>

                {/* Hamburger Icon */}
                <button
              className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="h-6 w-6 text-gray-600" />
            </button>

            {/* User Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaUser className="h-6 w-6 text-gray-600" onClick={handleProfile} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <FaShoppingCart className="h-6 w-6 text-gray-600" onClick={handleOpenCart}/>
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.length}
                </span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-3 bg-gray-100 rounded-md p-4 lg:hidden">
              {/* <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  name="name"
                  value={searchQuery}
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </div> */}
              <div className="flex flex-col gap-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded-md flex items-center gap-2"
                  onClick={handleProfile}
                >
                  <FaUser className="h-5 w-5 text-gray-600" />
                  <span>Profile</span>
                </button>
                <button  className="p-2 hover:bg-gray-200 rounded-md flex items-center gap-2">
                  <FaShoppingCart className="h-5 w-5 text-gray-600" onClick={handleOpenCart}/>
                  <span>Cart</span>
                </button>
                <button
                  className="p-2 hover:bg-gray-200 rounded-md flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {
        (cartSide==true) && <CartSidebar  handleCloseCart={handleCloseCart}/>
      }
    </>
  );
};

export default Navbar;
