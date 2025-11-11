import React from 'react'
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { formatterUtility } from '../../utilities/formatterutility';
import { useCartStore } from '../../store/cartStore';

interface PackageCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  image: string;
  price: number;
  showMidLine?: boolean;
}

const PackageCard = (item: PackageCardProps) => {
    const { addToCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
        });
    };

  return (
    <div
        className="cursor-pointer relative flex justify-center"
    >
        {/* Purple bar slightly showing behind card */}
        <div
        className={`absolute ${
            !item.showMidLine ? "hidden": item.index % 2 === 0 ? "-top-2" : "-bottom-2"
        } w-full h-13 bg-(--primary-color)/50 rounded-full z-0`}
        ></div>

        {/* Card content */}
        <div className="bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center text-center relative z-10">
            <img
                src={item.image}
                alt={item.title}
                className="w-36 h-36 object-cover rounded-full mb-4"
            />
            <h2 className="text-[22px] font-semibold! line-clamp-1 texr-(--accent-color)">
                {item.title}
            </h2>
            <p className="text-(--accent-color) text-sm mt-2 font-[inter]! line-clamp-3">{item.description}</p>
            <p className="mt-3 font-bold text-black/80 md:text-[24px] text-[20px]">
                Price: {formatterUtility(Number(item.price))}
            </p>

            <div className="flex gap-3 mt-10">
                {/* Add to Cart Button */}
                <button 
                    onClick={handleAddToCart}
                    className="cursor-pointer flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium px-3 py-3 rounded-sm transition-colors duration-200 shadow-sm"
                >
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>

                {/* View Details Button */}
                <button 
                    className="cursor-pointer flex items-center justify-center gap-1 bg-transparent text-(--primary-color) font-medium px-3 py-3 transition-colors duration-200 border border-(--primary-color)"
                >
                    View Details
                    <FiArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default PackageCard