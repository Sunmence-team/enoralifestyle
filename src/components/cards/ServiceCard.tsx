import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiShoppingCart, FiX } from 'react-icons/fi';
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
    const [selectedService, setSelectedService] = useState<ServiceCardProps | null>(null);
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

    useEffect(() => {
        if (selectedService !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedService]);

    return (
        <>
            <div
                className="bg-white rounded-3xl pb-5 shadow-sm hover:shadow-md transition-all duration-300  flex flex-col items-center text-start md:h-[520px] h-[530px]"
            >
                <div className="h-[250px] w-full">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-t-lg mb-4"
                    />
                </div>
                <div className="px-5 pt-5 w-full flex flex-col justify-between h-[calc(100%-250px)]">
                    <div className="">
                        <h2 className="capitalize text-[22px] font-semibold! text-(--accent-color) line-clamp-1">
                            {item.title}
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm font-[inter]! line-clamp-3">{item.description}</p>
                        <p className="mt-3 font-bold text-black/80 md:text-[24px] text-[20px]">
                            Price: {formatterUtility(Number(item.price))}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-8">
                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart}
                            className="w-1/2 cursor-pointer flex items-center justify-center gap-2 bg-(--primary-color) hover:bg-(--primary-color) text-white font-medium md:px-3 px-1 py-3 rounded-sm transition-colors duration-200 shadow-sm"
                        >
                            <FiShoppingCart className="md:size-5 size-4" />
                            Add to Cart
                        </button>

                        {/* View Details Button */}
                        <button 
                            className="w-1/2 cursor-pointer flex items-center justify-center gap-1 bg-transparent text-(--primary-color) font-medium md:px-3 px-1 py-3 transition-colors duration-200 border border-(--primary-color)"
                            onClick={() => setSelectedService(item)}
                        >
                            View Details
                            <FiArrowRight className="md:size-4 size-3 ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
                    <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
                        <div className="relative h-[250px]">

                            <div className="absolute inset-0 bg-black/60"></div>

                            <button
                                onClick={() => setSelectedService(null)}
                                className="cursor-pointer absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
                            >
                                <FiX size={20} />
                            </button>

                            <img
                                src={selectedService.image}
                                alt={selectedService.title}
                                className="w-full h-full object-cover rounded-t-3xl"
                            />

                            <p className="absolute top-0 left-4 mt-4 text-2xl font-semibold! text-white">
                                Price:{" "}
                                <span className="font-bold!">
                                {formatterUtility(Number(selectedService.price))}
                                </span>
                            </p>
                        </div>

                        <div className="p-6 lg:h-[40vh] md:h-[30vh] h-[50vh] overflow-y-auto styled-scrollbar">
                            <h2 className="text-[24px] font-semibold text-black mb-2">
                                {selectedService.title}
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {selectedService.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ServiceCard