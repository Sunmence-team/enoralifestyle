import React, { useEffect, useState } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import { FiX } from "react-icons/fi";
import PackageCard from "../components/cards/PackageCard";

interface SelectedPackage {
  title: string;
  description: string;
  price: string;
  image: string;
}

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "Packages - Enora Lifestyle And Spa";
  }, [])

  // --- Array of packages ---
  const packages = [
    {
      id: "1",
      title: "Manicure & Pedicure",
      description:
        "Manicure is for general hand care. Our classic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
      price: 15_000,
      image: assets.our1,
    },
    {
      id: "2",
      title: "Facial & Waxing",
      description:
        "Specialized facials for acne, anti-aging, and skin rejuvenation, plus expert waxing services. We also offer personalized skin consultations.",
      price: 12_000,
      image: assets.our2,
    },
    {
      id: "3",
      title: "Body Scrub & Polish",
      description:
        "Is your skin dull and dehydrated? Get Enora Brightening Scrub, Polish, Moroccan Hammam Scrub or Enora Glow Bath.",
      price: 18_000,
      image: assets.our3,
    },
    {
      id: "4",
      title: "Manicure & Pedicure",
      description:
        "Manicure is for general hand care. Our classic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
      price: 15_000,
      image: assets.our1,
    },
    {
      id: "5",
      title: "Facial & Waxing",
      description:
        "Specialized facials for acne, anti-aging, and skin rejuvenation, plus expert waxing services. We also offer personalized skin consultations.",
      price: 12_000,
      image: assets.our2,
    },
    {
      id: "6",
      title: "Body Scrub & Polish",
      description:
        "Is your skin dull and dehydrated? Get Enora Brightening Scrub, Polish, Moroccan Hammam Scrub or Enora Glow Bath.",
      price: 18_000,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {packages.map((item, index) => (
            <PackageCard 
              id={item.id}
              index={index}
              title={item.title}
              description={item.description}
              price={item.price}
              image={item.image}
              showMidLine={false}
            />
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
