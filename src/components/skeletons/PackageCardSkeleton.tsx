import React from 'react'
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

// The interface remains for type definition, though the skeleton doesn't use the props.
interface PackageCardProps {
    id: string;
    index: number;
    title: string;
    description: string;
    image: string;
    price: number;
    showMidLine?: boolean;
}

// Renamed for clarity as a skeleton component
const PackageCardSkeleton = () => {
    return (
        <div
            className="relative flex justify-center animate-pulse"
            aria-hidden="true" // Hide from screen readers
        >
            {/* Skeleton for the background purple bar */}
            {/* The conditional logic is removed, and a simple placeholder is used if needed */}
            <div
                className={`absolute w-full h-13 bg-gray-300 rounded-full z-0`}
            ></div>

            {/* Card content skeleton */}
            <div className="bg-white border border-black/5 rounded-3xl shadow-sm p-5 flex flex-col items-center text-center relative z-10 w-full">
                {/* Skeleton Image Placeholder (circular) */}
                <div
                    className="w-36 h-36 bg-gray-300 rounded-full mb-4"
                ></div>

                {/* Skeleton Title */}
                <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>

                {/* Skeleton Description (3 lines) */}
                <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 mt-1"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-1"></div>

                {/* Skeleton Price */}
                <div className="mt-3">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
                </div>

                <div className="flex gap-3 mt-10 w-full">
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
        // The modal section is omitted as a skeleton should only show the primary card content.
    );
}

export default PackageCardSkeleton;