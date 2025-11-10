import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { assets } from "../assets/assests";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/services", name: "Services" },
    { path: "/packages", name: "packages" },
    { path: "/blog", name: "Blog" },
    { path: "/appointment", name: "Appointment" },
  ];

  // Detect scroll and change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center lg:px-10 px-5 h-[70px] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="made-container flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[var(--primary-color)] font-semibold"
                    : isScrolled
                    ? "text-gray-800 hover:text-[var(--primary-color)]"
                    : "text-white hover:text-[var(--primary-color)]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Desktop Button */}
        <Link
          to="/appointment"
          className={`hidden lg:flex py-3 px-6 rounded-[10px]  text-sm font-medium transition-all duration-200 cursor-pointer hover:opacity-90 active:scale-95 ${
            isScrolled
              ? "bg-[var(--primary-color)] text-white"
              : "bg-[var(--primary-color)] text-white"
          }`}
        >
          Book Appointment
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`lg:hidden block text-2xl cursor-pointer active:scale-90 transition-transform ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-screen bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col text-[15px] font-medium ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Logo */}
        <div className="w-full flex items-center justify-center border-b border-gray-200 py-5 shadow-sm">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col items-center justify-start flex-1 gap-6 mt-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[var(--primary-color)] font-bold"
                    : "text-gray-700 hover:text-[var(--primary-color)]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Button inside sidebar */}
          <Link
            to="/appointment"
            onClick={handleLinkClick}
            className="bg-[var(--primary-color)] hover:opacity-90 active:scale-95 text-white py-3 px-5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer mt-6"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
