import React from 'react'
import { assets } from "../assets/assests";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineArrowOutward } from "react-icons/md";

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
        <div className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-10 py-10">
            {packages.map((pkg, index) => (
                <div key={index} className="relative flex justify-center">
                    {/* Purple bar slightly showing behind card */}
                    <div
                        className={`absolute ${index % 2 === 0 ? "-top-2" : "-bottom-2"
                            } w-full h-13 bg-(--primary-color) rounded-full z-0`}
                    ></div>

                    {/* Card content */}
                    <div className="w-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 px-7 py-10 flex flex-col items-center text-center relative z-10">
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

                        <div className="flex gap-3">
                            <button className="bg-(--primary-color) flex items-center justify-center gap-2 font-bold rounded-md p-2  text-white transition-all duration-300 cursor-pointer md:text-[16px] text-[16px] mt-5">
                                <IoCartOutline size={25} /> 
                                <span>Add to cart</span>
                            </button>

                            <button className="text-(--primary-color) border-2 border-[--primary-color] flex items-center gap-2 font-bold rounded-md p-2  hover:text-black transition-all duration-300 cursor-pointer md:text-[16px] text-[16px] mt-5">
                                <span>View Details</span>
                                <MdOutlineArrowOutward size={25} />
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </div>


    )
}
