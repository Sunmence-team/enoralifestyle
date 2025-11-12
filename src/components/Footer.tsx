import React from "react";
import { FaInstagram, FaXTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-5 lg:px-10 mt-20">
      {/* Top Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Enora Lifestyle</h1>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium">
          <a href="/" className="hover:text-(--primary-color) transition">
            Home
          </a>
          <a href="/services" className="hover:text-(--primary-color) transition">
            Services
          </a>
          <a href="/packages" className="hover:text-(--primary-color) transition">
            Packages
          </a>
          <a href="/blog" className="hover:text-(--primary-color) transition">
            Blog
          </a>
          <a href="/contact" className="hover:text-(--primary-color) transition">
            Contact Us
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6 text-2xl">
          <a href="https://wa.me/+2347035544194" target="_blank" className="hover:text-(--primary-color) transition">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/enoralifestyleng/?utm_source=ig_web_button_share_sheet" target="_blank" className="hover:text-(--primary-color) transition">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100051596345009&ref=ac_edit_ig_profile_ac" target="_blank" className="hover:text-(--primary-color) transition">
            <FaFacebook />
          </a>
          <a href="https://x.com/EnoraLifes3249?s=20" target="_blank" className="hover:text-(--primary-color) transition">
            <FaXTwitter />
          </a>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-400 mt-6">
          21 Oyegbami Street, Felele Road, Ibadan (Felele)
        </p>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-700" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-xs">
        <p className="mb-2 md:mb-0">
          Enoralifestyle© {new Date().getFullYear()} All rights reserved
        </p>
        <div className="flex items-center divide-x divide-gray-600">
          <a href="/terms" className="px-3 hover:text-(--primary-color) transition">
            Terms
          </a>
          <a href="/privacy" className="px-3 hover:text-(--primary-color) transition">
            Privacy
          </a>
          <a href="/contact" className="px-3 hover:text-(--primary-color) transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;