import React from 'react'
import { IoSearch } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export default function Appointments() {
  return (
    <div>
      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className='font-bold text-2xl'>Add Sercice</h2>

        <div className='flex gap-3'>
          <div className='flex items-center gap-2 text-sm rounded-full bg-white px-3 py-2 border border-[var(--primary-color)]'>
            <input
              type="search"
              placeholder="Search"
              className="w-full outline-none border-none bg-transparent placeholder:text-gray-400 text-gray-700"
            />
            <span>
              <IoSearch size={20} className="text-gray-400" />
            </span>
          </div>
          <div className=' flex gap-3 text-sm items-center rounded-full bg-white px- py-2 border border-(--primary-color) '>
            <span><MdFilterList size={20} className='text-gray-400' /></span>
            <input type="search" placeholder='Filter' className='' />
          </div>


        </div>

        <div className='flex gap-3'>
          <div className='p-3 rounded-full bg-[var(--pink-color)] '><IoIosNotifications size={25} className='text-[var(--primary-color)]' /></div>
          <div className='p-3 rounded-full bg-[var(--pink-color)]'><FaRegUserCircle size={25} className='text-[var(--primary-color)]' /></div>
        </div>
      </div>

    </div>
  )
}
