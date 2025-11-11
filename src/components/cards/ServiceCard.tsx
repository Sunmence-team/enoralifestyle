import React from 'react'
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { formatterUtility } from '../../utilities/formatterutility';
import { useCartStore } from '../../store/cartStore';

interface ServiceCardProps {
    id: string;
    index: number;
    title: string;
    description: string;
    image: string;
    price: number;
}

const ServiceCard = (item: ServiceCardProps) => {
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
            className="bg-white rounded-3xl pb-5 shadow-sm hover:shadow-md transition-all duration-300  flex flex-col items-center text-start"
        >
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] object-cover rounded-t-2xl mb-4"
            />
            <div className="px-5 flex flex-col justify-between h-full">
                <div className="">
                    <h2 className="text-[22px] font-semibold! text-(--accent-color) line-clamp-1">
                        {item.title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm font-[inter]! line-clamp-3">{item.description}</p>
                    <p className="mt-3 font-bold text-black/80 md:text-[24px] text-[20px]">
                        Price: {formatterUtility(Number(item.price))}
                    </p>
                </div>

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

export default ServiceCard