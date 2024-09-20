import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import Logo from "../../../assets/dd.png";
import DarkMode from "./DarkMode";


import Cart from "../../cart/Cart";
import Wishlist from "../../Wishlist/Wishlist";


const DashboardHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  return (
    <><div className={`w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm ${active ? "fixed top-0 left-0 z-10" : ""}`}>
      <div className={`shadow-md bg-black dark:bg-gray-900 dark:text-white duration-200 relative z-40 ${active ? "fixed top-0 left-0 z-10" : ""}`}>
        <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center">
            <Link to="/" className="font-bold text-base flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              IkeMarfo
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <AiOutlineSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                {searchData?.length > 0 && (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-9 p-4">
                    {searchData.map((product, index) => (
                      <Link to={`/product/${product._id}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img src={product.images[0]?.url} alt={product.name} className="w-[40px] h-[40px] mr-[10px]" />
                          <h1>{product.name}</h1>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <DarkMode />
              <div onClick={() => setOpenWishlist(true)} className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                {wishlist?.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div onClick={() => setOpenCart(true)} className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                {cart?.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    {cart.length}
                  </span>
                )}
              </div>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img src={user?.avatar?.url} className="w-[35px] h-[35px] rounded-full" alt="Profile" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
        <div className="w-full flex items-center justify-between"></div>
      </div>
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="flex justify-between p-3">
              <div className="relative" onClick={() => setOpenWishlist(true) || setOpen(false)}>
                <AiOutlineHeart size={30} className="mt-5 ml-3" />
                {wishlist?.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)} />
            </div>
            <div className="my-8 w-[92%] m-auto h-[40px] relative">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchData?.length > 0 && (
                <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                  {searchData.map((product) => (
                    <Link to={`/product/${product.name.replace(/\s+/g, "-")}`} key={product._id}>
                      <div className="flex items-center">
                        <img src={product.image_Url[0]?.url} alt={product.name} className="w-[50px] mr-2" />
                        <h5>{product.name}</h5>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
           
            <div className="flex justify-center mt-4">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img src={user?.avatar?.url} alt="Profile" className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]" />
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-[18px] pr-[10px] text-[#000000b7]">
                    Login /
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default DashboardHeader;
