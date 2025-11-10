import React from 'react'
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

interface PackageCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const PackageCard = (item: PackageCardProps) => {
  return (
    <div key={item.index} className="relative flex justify-center">
        {/* Purple bar slightly showing behind card */}
        <div
        className={`absolute ${
            item.index % 2 === 0 ? "-top-2" : "-bottom-2"
        } w-full h-13 bg-(--primary-color) rounded-full z-0`}
        ></div>

        {/* Card content */}
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center relative z-10">
        <img
            src={item.image}
            alt={item.title}
            className="w-[180px] h-[180px] object-cover rounded-full mb-4"
        />
        <h2 className="text-[22px] font-semibold text-(--primary-color)">
            {item.title}
        </h2>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <p className="mt-3 font-bold text-black/80 md:text-[24px] text-[20px]">
            {item.price}
        </p>

        <div className="flex gap-3 mt-10">
            {/* Add to Cart Button */}
            <button className="flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 shadow-sm">
            <FiShoppingCart className="w-5 h-5" />
            Add to Cart
            </button>

            {/* View Details Button */}
            <button className="flex items-center justify-center gap-1 bg-transparent hover:bg-gray-200 text-(--primary-color) font-medium px-6 py-3 rounded-md transition-colors duration-200 border border-(--primary-color)">
            View Details
            <FiArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
        </div>
    </div>
  )
}

export default PackageCard