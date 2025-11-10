import React, { useState } from "react";
import HeroSection from "../components/herosections/Herosection";
import { assets } from "../assets/assests";
import { FiShoppingCart, FiArrowRight, FiX } from "react-icons/fi";

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  // --- Array of services ---
  const services = [
    {
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: "₦30,000",
      image: assets.ser1,
    },
    {
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: "₦35,000",
      image: assets.ser2,
    },
    {
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: "₦40,000",
      image: assets.ser3,
    },
    {
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: "₦30,000",
      image: assets.ser1,
    },
    {
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: "₦35,000",
      image: assets.ser2,
    },
    {
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: "₦40,000",
      image: assets.ser3,
    },
    {
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: "₦30,000",
      image: assets.ser1,
    },
    {
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: "₦35,000",
      image: assets.ser2,
    },
    {
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: "₦40,000",
      image: assets.ser3,
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Services"
        backgroundImage={assets.servicehero}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* SERVICES GRID */}
      <div className="mt-20 lg:px-10 px-5">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl pb-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-start"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-t-2xl mb-4"
              />
              <div className="px-5">
                <h2 className="text-[22px] font-semibold text-black">
                  {item.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
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
                    onClick={() => setSelectedService(item)}
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
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            {/* Modal Content */}
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-[300px] object-cover rounded-t-3xl"
            />

            <div className="p-6">
              <h2 className="text-[24px] font-semibold text-black mb-2">
                {selectedService.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedService.description}
              </p>
              <p className="mt-4 text-[20px] font-semibold text-black/80">
                Price:{" "}
                <span className="text-[var(--primary-color)]">
                  {selectedService.price}
                </span>
              </p>

              <div className="mt-6 flex justify-end">
                {/* <button
                  onClick={() => setSelectedService(null)}
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

export default Services;
