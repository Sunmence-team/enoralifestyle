import React from "react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { assets } from "../assets/assests";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-5 lg:px-10 mt-20">
      <div className="flex flex-col lg:flex-row justify-between border-b border-gray-700 pb-8 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <h2 className="text-lg font-semibold">Enora Lifestyle</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            At Enora Lifestyle, we help you relax, glow, and feel confident with
            expert facials, body care, and wellness therapies.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="text-base font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-[var(--primary-color)] transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="hover:text-[var(--primary-color)] transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="hover:text-[var(--primary-color)] transition"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/appointment"
                className="hover:text-[var(--primary-color)] transition"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-base font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center gap-4 text-xl">
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-[var(--primary-color)] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              className="hover:text-[var(--primary-color)] transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-xs text-white">
        <p className="text-center md:text-left mb-2 md:mb-0">
          Enoralifestyle© {new Date().getFullYear()} All rights reserved
        </p>
        <div className="flex items-center divide-x divide-gray-600">
          <a
            href="/terms"
            className="px-3 hover:text-[var(--primary-color)] transition"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="px-3 hover:text-[var(--primary-color)] transition"
          >
            Privacy
          </a>
          <a
            href="/contact"
            className="px-3 hover:text-[var(--primary-color)] transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
