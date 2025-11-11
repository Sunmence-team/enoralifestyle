// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { assets } from "../../assets/assests";
import { MdShoppingCart } from "react-icons/md";
import { useCartStore } from "../../store/cartStore";
import CartCard from "../cards/CartCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  type: "service" | "package";
  image: string | null;
}

// Paystack success listener (clears cart when returning from Paystack)
const usePaystackSuccess = () => {
  const { clearCart } = useCartStore();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("trxref");
    const status = params.get("status");

    if (ref && status === "success") {
      clearCart();
      // Clean URL
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location, clearCart]);
};

const Navbar: React.FC = () => {
  usePaystackSuccess(); // Runs on every page

  const [isOpen, setIsOpen] = useState({ sidebar: false, cart: false });
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, setItems } = useCartStore();

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/services", name: "Services" },
    { path: "/packages", name: "Packages" },
    { path: "/blog", name: "Blog" },
    { path: "/contact", name: "Contact Us" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch services & auto-fill cart (demo)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        const data: ServiceItem[] = res.data.data?.data || [];

        const cartItems = data.map((item) => ({
          id: item.id.toString(),
          title: item.name,
          price: parseFloat(item.price),
          image: item.image ? `${IMAGE_URL}${item.image}` : assets.our1,
        }));

        setItems(cartItems.slice(0, 2));
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    };

    fetchServices();
  }, [setItems]);

  const cartCount = items.length;

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen({ sidebar: false, cart: false });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center lg:px-10 px-5 h-[70px] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="made-container flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={assets.logo} alt="Logo" className="w-12 h-12 md:w-14 md:h-14 object-cover" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? `${isScrolled ? "text-(--accent-color)" : "text-white"} font-semibold`
                    : isScrolled
                    ? "text-(--accent-color)/90 hover:text-(--accent-color)"
                    : "text-white/60 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-6">
          <button
            className={`inline-flex rounded-full text-2xl font-medium transition-all duration-200 cursor-pointer hover:opacity-90 relative ${
              isScrolled ? "text-(--primary-color)" : "text-white"
            }`}
            onClick={() => setIsOpen({ sidebar: false, cart: true })}
          >
            <MdShoppingCart />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-(--primary-color) rounded-full text-white text-xs flex items-center justify-center w-5 h-5 border-2 border-white">
                <span className="-mt-1">{cartCount}</span>
              </div>
            )}
          </button>

          <button
            type="button"
            className={`lg:hidden block text-2xl cursor-pointer active:scale-90 transition-transform ${
              isScrolled ? "text-(--accent-color)" : "text-white"
            }`}
            onClick={() => setIsOpen({ sidebar: true, cart: false })}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-screen bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col text-[15px] font-medium ${
          isOpen.sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex items-center justify-center border-b border-gray-200 py-5 shadow-sm">
          <img src={assets.logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
        </div>
        <div className="flex flex-col items-center justify-start flex-1 gap-6 mt-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-(--primary-color) font-bold" : "text-gray-700 hover:text-(--primary-color)"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 lg:w-1/2 w-4/5 h-screen bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col text-[15px] font-medium ${
          isOpen.cart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full flex gap-2 items-center justify-center border-b border-gray-200 py-3 shadow-sm">
          <img src={assets.logo} alt="Logo" className="w-12 h-12 object-cover" />
          <h3 className="text-2xl font-bold">Cart</h3>
        </div>

        {items.length > 0 ? (
          <div className="text-center pe-2 h-[calc(100%-78px)] flex flex-col justify-between">
            <div className="flex flex-col items-center justify-start flex-1 gap-6 md:px-6 px-2 py-2 h-[calc(100vh-140px)] overflow-y-auto styled-scrollbar">
              {items.map((cartItem, index) => (
                <CartCard key={index} {...cartItem} />
              ))}
            </div>
            <Link
              to="/reservation"
              onClick={() => setIsOpen({ sidebar: false, cart: false })}
              className="bg-(--primary-color) py-3 px-4 rounded-sm mt-3 mx-auto text-white"
            >
              Proceed to Reservation
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center h-[50vh]">
            <h3 className="text-(--accent-color) text-3xl font-semibold">No Item In Cart...</h3>
            <Link
              to="/services"
              className="bg-(--primary-color) py-2 px-4 rounded-sm text-white cursor-pointer"
              onClick={() => setIsOpen({ sidebar: false, cart: false })}
            >
              Keep Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Overlay */}
      {(isOpen.cart || isOpen.sidebar) && (
        <div
          className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
          onClick={() => setIsOpen({ sidebar: false, cart: false })}
        />
      )}
    </nav>
  );
};

export default Navbar;