import React, { useEffect, useState } from "react";
import { FiArrowRight, FiShoppingCart, FiX } from "react-icons/fi";
import { formatterUtility } from "../../utilities/formatterutility";
import { useCartStore } from "../../store/cartStore";

interface PackageCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  image: string;
  price: string;
  showMidLine?: boolean;
}

const PackageCard = (item: PackageCardProps) => {
  const [selectedPackage, setSelectedPackage] =
    useState<PackageCardProps | null>(null);
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: item.id,
      title: item.title,
      price: Number(item.price),
      image: item.image,
    });
  };

  useEffect(() => {
    if (selectedPackage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPackage]);

  return (
    <>
      <div className="w-full cursor-pointer relative flex justify-center">
        {/* Purple bar slightly showing behind card */}
        <div
          className={`absolute ${
            item.index % 2 === 0 ? "-top-2" : "-bottom-2"
          } w-full h-13 bg-(--primary-color)/50 rounded-full z-0`}
        ></div>

        {/* Card content */}
        <div className="bg-white h-[440px] w-full border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center text-center relative z-10">
          <img
            src={item.image}
            alt={item.title}
            className="w-36 h-36 object-cover rounded-full mb-4"
          />
          <h2 className="capitalize text-[22px] font-semibold! line-clamp-1 text-(--accent-color)">
            {item.title}
          </h2>
          <p className="text-(--accent-color) text-sm mt-2 font-[inter]! line-clamp-3">
            {item.description}
          </p>
          <p className="mt-3 font-bold text-black/80 md:text-[24px] text-[20px]">
            Price: {formatterUtility(Number(item.price))}
          </p>

          <div className="flex mt-auto gap-3 justify-between w-full">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="md:w-max w-1/2 cursor-pointer flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium md:px-3 px-1 py-3 rounded-sm transition-colors duration-200 shadow-sm"
            >
              <FiShoppingCart className="md:size-5 size-4" />
              Add to Cart
            </button>

            {/* View Details Button */}
            <button
              className="md:w-max w-1/2 cursor-pointer flex items-center justify-center gap-1 bg-transparent text-(--primary-color) font-medium md:px-3 px-1 py-3 transition-colors duration-200 border border-(--primary-color) rounded-sm"
              onClick={() => setSelectedPackage(item)}
            >
              View Details
              <FiArrowRight className="md:size-4 size-3 ml-1 -rotate-40" />
            </button>
          </div>
        </div>
      </div>

      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
            <div className="relative h-[250px] ">
              <div className="absolute inset-0 bg-black/60"></div>

              <button
                onClick={() => setSelectedPackage(null)}
                className="cursor-pointer absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
              >
                <FiX size={20} />
              </button>

              <img
                src={selectedPackage.image}
                alt={selectedPackage.title}
                className="w-full h-full object-cover rounded-t-3xl"
              />

              <p className="absolute top-0 left-4 mt-4 text-2xl font-semibold! text-white">
                Price:{" "}
                <span className="font-bold!">
                  {formatterUtility(Number(selectedPackage.price))}
                </span>
              </p>
            </div>

            <div className="p-6 lg:h-[40vh] md:h-[30vh] h-[50vh] overflow-y-auto styled-scrollbar">
              <h2 className="text-[24px] font-semibold text-black mb-2">
                {selectedPackage.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedPackage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageCard;
