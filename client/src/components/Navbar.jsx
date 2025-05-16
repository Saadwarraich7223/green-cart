import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        navigate("/");
        setUser(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 
        ${scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"}
        sticky top-0 z-50 transition-all duration-300`}
    >
      <NavLink to="/" onClick={() => setOpen(false)}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-10"
          src={assets.logo}
          alt="logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLinks location={location} itemVariants={itemVariants} />

        <motion.div
          variants={itemVariants}
          className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 rounded-full overflow-hidden group hover:border-primary transition-all duration-300 focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/30"
        >
          <input
            className="py-2 px-4 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              navigate("/products");
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-100 hover:bg-primary/10 transition-colors p-2 mr-1 rounded-full"
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 flex items-center justify-center rounded-full"
          >
            {getCartCount()}
          </motion.span>
        </motion.div>

        {!user ? (
          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull text-white rounded-full shadow-md shadow-primary/30 hover:shadow-lg transition-all"
          >
            Login
          </motion.button>
        ) : (
          <div className="relative group">
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={assets.profile_icon}
              alt="profile"
              className="w-10 cursor-pointer"
            />
            <ul className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
              <motion.li
                whileHover={{ backgroundColor: "#4fbf8b", x: 0.5 }}
                onClick={() => navigate("/my-orders")}
                className="p-2 pl-3 cursor-pointer flex items-center gap-2"
              >
                📦 My Orders
              </motion.li>
              <motion.li
                whileHover={{ backgroundColor: "#4fbf8b", x: 0.5 }}
                onClick={logout}
                className="p-2 pl-3 cursor-pointer flex items-center gap-2"
              >
                🚪 Logout
              </motion.li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex sm:hidden justify-center items-center gap-6">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/cart")}
          className="relative sm:hidden flex cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 flex items-center justify-center rounded-full"
          >
            {getCartCount()}
          </motion.span>
        </motion.div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className=" relative w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
        >
          <div className="flex flex-col justify-center items-center">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 2 : 0 }}
              className="block h-0.5 w-5 bg-gray-600 transition-all duration-300"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, width: open ? 0 : 20 }}
              className="block h-0.5 w-5 bg-gray-600 my-1 transition-all duration-300"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -2 : 0 }}
              className="block h-0.5 w-5 bg-gray-600 transition-all duration-300"
            />
          </div>
        </motion.button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[60px] left-0 w-full bg-white shadow-md py-6 flex flex-col items-start gap-4 px-6 text-sm sm:hidden overflow-hidden z-40"
          >
            <MobileNavLinks
              location={location}
              setOpen={setOpen}
              variants={mobileItemVariants}
              user={user}
            />

            <motion.div
              variants={mobileItemVariants}
              className="w-full flex items-center text-sm gap-2 border border-gray-300 rounded-full overflow-hidden my-2 focus-within:border-primary focus-within:shadow-sm"
            >
              <input
                className="py-2 px-4 w-full bg-transparent outline-none placeholder-gray-500"
                type="text"
                placeholder="Search products"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-gray-100 p-2 mr-1 rounded-full"
              >
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-4 h-4"
                />
              </motion.button>
            </motion.div>

            <motion.div
              variants={mobileItemVariants}
              className="w-full flex gap-3"
            >
              {!user ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setOpen(false);
                    setShowUserLogin(true);
                  }}
                  className="cursor-pointer px-6 py-2 bg-primary text-white rounded-full shadow-sm flex-1"
                >
                  Login
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="cursor-pointer px-6 py-2 bg-primary text-white rounded-full shadow-sm flex-1"
                >
                  Logout
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({ location, itemVariants }) => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "All Products" },
    { path: "/contact", label: "Contact" },
  ];

  return navItems.map((item) => (
    <motion.div key={item.label} variants={itemVariants} className="relative">
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `text-base hover:text-primary transition-colors ${
            isActive ? "text-primary font-medium" : "text-gray-700"
          }`
        }
      >
        {item.label}
        {location.pathname === item.path && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute -bottom-[8px] left-0 w-full h-[3px] bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </NavLink>
    </motion.div>
  ));
};

const MobileNavLinks = ({ location, setOpen, variants, user }) => {
  const navItems = [
    { path: "/", label: "Home", icon: "🏠", show: true },
    { path: "/products", label: "All Products", icon: "🛒", show: true },
    { path: "/my-orders", label: "My Orders", icon: "📦", show: user },
    { path: "/contact", label: "Contact", icon: "📞", show: true },
  ];

  return navItems.map(
    (item) =>
      item.show && (
        <motion.div key={item.label} variants={variants} className="w-full">
          <NavLink
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 w-full rounded-lg
              ${
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }
              transition-all duration-200
            `}
          >
            <span className="opacity-70">{item.icon}</span>
            {item.label}
          </NavLink>
        </motion.div>
      )
  );
};

export default Navbar;
