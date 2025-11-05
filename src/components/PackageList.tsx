import React from 'react'
import { assets } from "../assets/assests";

export default function PackageList() {

    const packages = [
        {
            id: 1,
            name: "Manicure & Pedicure",
            description: "Manicure is for general hand care. Our classic pedicure includes nail painting / leg reflexology. Ideal for encouraging blood circulation.",
            price: "12,500",
            img: assets.face
        },
        {
            id: 2,
            name: "Facial & Waxing",
            description: "Specialized facials for acne, anti-aging, and skin rejuvenation, plus expert waxing services. We also offer personalized skin consultations.",
            price: "31,000",
            img: assets.face
        },
        {
            id: 3,
            name: "Body Scrub & Polish",
            description: "Is your skin dull and dehydrated? Get Enora Brightening Scrub, Polish, Moroccan Hammam Scrub or Enora Glow Bath.",
            price: "30,000",
            img: assets.leg
        },
        {
            id: 4,
            name: "Manicure & Pedicure",
            description: "Manicure is for general hand care.  Our claasic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
            price: "12,5000",
            img: assets.face
        },
        {
            id: 5,
            name: "Manicure & Pedicure",
            description: "Manicure is for general hand care.  Our claasic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
            price: "12,5000",
            img: assets.face
        },
        {
            id: 6,
            name: "Manicure & Pedicure",
            description: "Manicure is for general hand care.  Our claasic pedicure includes nail painting/leg reflexology. Ideal for encouraging blood circulation.",
            price: "12,5000",
            img: assets.face
        },

    ]

    return (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-12 py-10">
            {packages.map((pkg, index) => (
                <div key={index} className="relative flex justify-center">
                    {/* Purple bar slightly showing behind card */}
                    <div
                        className={`absolute ${index % 2 === 0 ? "-top-2" : "-bottom-2"
                            } w-[100%] h-13 bg-[var(--primary-color)] rounded-full z-0`}
                    ></div>

                    {/* Card content */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 px-1 py-10 flex flex-col items-center text-center relative z-10">
                        <img
                            src={pkg.img}
                            alt={pkg.name}
                            className="w-[180px] h-[180px] object-cover rounded-full mb-4"
                        />
                        <p className="text-[23px] font-bold mt-2">{pkg.name}</p>
                        <p className="text-gray-600 text-sm mt-2">{pkg.description}</p>
                        <p className="mt-2 font-bold ttext-gray-600 text-sm md:text-[24px] text-[20px]">
                            {pkg.price}
                        </p>

                        <button className="text-[var(--primary-color)] font-bold rounded-full hover:text-black transition-all duration-300 cursor-pointer md:text-[24px] text-[20px] mt-5">
                            Book Now
                        </button>
                    </div>
                </div>
            ))}
        </div>


    )
}
