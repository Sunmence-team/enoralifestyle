import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    if (showTerms || showPrivacy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showTerms, showPrivacy]);

  return (
    <footer className="bg-black text-white pt-12 pb-6 px-5 lg:px-10 mt-20 relative">
      {/* Top Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Enora Lifestyle</h1>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium">
          <a href="/" className="hover:text-(--primary-color) transition">
            Home
          </a>
          <a
            href="/services"
            className="hover:text-(--primary-color) transition"
          >
            Services
          </a>
          <a
            href="/packages"
            className="hover:text-(--primary-color) transition"
          >
            Packages
          </a>
          <a
            href="/blog"
            className="hover:text-(--primary-color) transition"
          >
            Blog
          </a>
          <a
            href="/contact"
            className="hover:text-(--primary-color) transition"
          >
            Contact Us
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6 text-2xl">
          <a
            href="https://wa.me/+2347035544194"
            target="_blank"
            className="hover:text-(--primary-color) transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/enoralifestyleng/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            className="hover:text-(--primary-color) transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100051596345009&ref=ac_edit_ig_profile_ac"
            target="_blank"
            className="hover:text-(--primary-color) transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/EnoraLifes3249?s=20"
            target="_blank"
            className="hover:text-(--primary-color) transition"
          >
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
          <button
            onClick={() => setShowTerms(true)}
            className="px-3 hover:text-(--primary-color) transition"
          >
            Terms
          </button>
          <button
            onClick={() => setShowPrivacy(true)}
            className="px-3 hover:text-(--primary-color) transition"
          >
            Privacy
          </button>
          <a
            href="/contact"
            className="px-3 hover:text-(--primary-color) transition"
          >
            Contact
          </a>
        </div>
      </div>

      {/* ===== Terms Modal ===== */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-2xl max-w-lg w-[90%] shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold! mb-4 text-(--primary-color) text-center">
              Terms & Conditions
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed space-y-3">
              <span className="block font-semibold text-black">Bookings:</span>{" "}
              Appointments can be made via our website, WhatsApp, phone, social
              media DMs, or in person. A deposit of ₦5,000 is required.
              Cancellations made within 24 hours will be refunded. However, a
              no-show will attract no refund.
              <br />
              <span className="block font-semibold text-black mt-3">
                Health & Safety:
              </span>{" "}
              Always inform us of any medical conditions, allergies, or
              pregnancy before treatments. Facilities like the pool, sauna,
              jacuzzi, and rooftop garden are for paying guests only. Follow all
              safety rules.
              <br />
              <span className="block font-semibold text-black mt-3">
                Liability:
              </span>{" "}
              We are not responsible for injuries caused by undisclosed health
              issues, lost items, or misuse of products. Respectful conduct is
              required.
              <br />
              <span className="block font-semibold text-black mt-3">
                Important Notice:
              </span>{" "}
              We do not offer erotic massages of any kind. Any such act will be
              treated as assault and prosecuted.
            </p>
          </div>
        </div>
      )}

      {/* ===== Privacy Modal ===== */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-2xl max-w-lg w-[90%] shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold! mb-4 text-(--primary-color) text-center">
              Privacy Policy
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed space-y-3">
              <span className="block font-semibold text-black">
                Data Safety:
              </span>{" "}
              Your information is stored securely and accessed only by
              authorized staff. Sharing: We never sell your data, except when
              required by law.
              <br />
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
