import React from 'react'
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

// Renamed for clarity as a skeleton component
const ServiceCardSkeleton = () => {
    // State, effects, and function handlers are removed in the skeleton.

    return (
        <div
            className="bg-white rounded-3xl pb-5 shadow-sm flex flex-col items-center text-start animate-pulse"
            aria-hidden="true" // Hide from screen readers
        >
            {/* Skeleton Image Placeholder */}
            <div
                className="w-full h-[250px] bg-gray-300 rounded-t-lg mb-4"
            >
            </div>

            <div className="px-5 flex flex-col justify-between h-full w-full">
                <div className="">
                    {/* Skeleton Title */}
                    <div className="h-6 bg-gray-200 rounded w-5/6 mb-3"></div>

                    {/* Skeleton Description (3 lines) */}
                    <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-11/12 mt-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mt-1"></div>

                    {/* Skeleton Price */}
                    <div className="mt-3">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    {/* Skeleton "Add to Cart" Button */}
                    <div
                        className="w-1/2 flex items-center justify-center gap-2 bg-gray-400 text-white font-medium px-3 py-3 rounded-sm"
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        <span className="h-4 w-16 bg-gray-300 rounded"></span>
                    </div>

                    {/* Skeleton "View Details" Button */}
                    <div
                        className="w-1/2 flex items-center justify-center gap-1 bg-transparent border border-gray-400 text-gray-400 font-medium px-3 py-3 rounded-sm"
                    >
                        <span className="h-4 w-16 bg-gray-300 rounded"></span>
                        <FiArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>
        </div>

        // The modal section has been entirely removed as a skeleton shouldn't
        // render a modal placeholder, only the primary card content.
    );
}

export default ServiceCardSkeleton;