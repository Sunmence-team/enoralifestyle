import React, { useState } from "react";
import Packagehero from '../components/Packagehero'
import { assets } from "../assets/assests";
import PackageList from '../components/PackageList';
import HeroSection from "../components/herosections/Herosection";
import { FiShoppingCart, FiArrowRight, FiX } from "react-icons/fi";

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // --- Array of packages ---
  const packages = [
    {
      title: "Manicure & Pedicure",
      description:
        "Manicure is for general hand care. Our classic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
      price: "₦15,000",
      image: assets.our1,
    },
    {
      title: "Facial & Waxing",
      description:
        "Specialized facials for acne, anti-aging, and skin rejuvenation, plus expert waxing services. We also offer personalized skin consultations.",
      price: "₦12,000",
      image: assets.our2,
    },
    {
      title: "Body Scrub & Polish",
      description:
        "Is your skin dull and dehydrated? Get Enora Brightening Scrub, Polish, Moroccan Hammam Scrub or Enora Glow Bath.",
      price: "₦18,000",
      image: assets.our3,
    },
    {
      title: "Manicure & Pedicure",
      description:
        "Manicure is for general hand care. Our classic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
      price: "₦15,000",
      image: assets.our1,
    },
    {
      title: "Facial & Waxing",
      description:
        "Specialized facials for acne, anti-aging, and skin rejuvenation, plus expert waxing services. We also offer personalized skin consultations.",
      price: "₦12,000",
      image: assets.our2,
    },
    {
      title: "Body Scrub & Polish",
      description:
        "Is your skin dull and dehydrated? Get Enora Brightening Scrub, Polish, Moroccan Hammam Scrub or Enora Glow Bath.",
      price: "₦18,000",
      image: assets.our3,
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Our Packages"
        backgroundImage={assets.pac}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* PACKAGES GRID */}
      <div className="mt-20 lg:px-10 px-5">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((item, index) => (
            <div key={index} className="relative flex justify-center">
              {/* Purple bar slightly showing behind card */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? "-top-2" : "-bottom-2"
                } w-[100%] h-13 bg-[var(--primary-color)] rounded-full z-0`}
              ></div>

              {/* Card content */}
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center relative z-10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[180px] h-[180px] object-cover rounded-full mb-4"
                />
                <h2 className="text-[22px] font-semibold text-[var(--primary-color)]">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <h2 className="mt-3 font-semibold text-black/80 md:text-[24px] text-[21px]">
                  {item.price}
                </h2>

                <div className="flex gap-3 mt-10">
                  {/* Add to Cart Button */}
                  <button className="flex items-center justify-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 shadow-sm">
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedPackage(item)}
                    className="flex items-center justify-center gap-1 bg-transparent hover:bg-gray-200 text-[var(--primary-color)] font-medium px-6 py-3 rounded-md transition-colors duration-200 border border-[var(--primary-color)]"
                  >
                    View Details
                    <FiArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            {/* Modal Content */}
            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full h-[300px] object-cover rounded-t-3xl"
            />

            <div className="p-6">
              <h2 className="text-[24px] font-semibold text-black mb-2">
                {selectedPackage.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedPackage.description}
              </p>
              <p className="mt-4 text-[20px] font-semibold text-black/80">
                Price:{" "}
                <span className="text-[var(--primary-color)]">
                  {selectedPackage.price}
                </span>
              </p>

              <div className="mt-6 flex justify-end">
                {/* <button
                  onClick={() => setSelectedPackage(null)}
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white px-6 py-2 rounded-md font-medium transition-all"
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
