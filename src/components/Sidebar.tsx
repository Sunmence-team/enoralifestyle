import React from 'react'
import { LuPackagePlus } from "react-icons/lu";
import { MdBathroom } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { NavLink } from 'react-router-dom';
// import { href } from 'react-router-dom';

export default function Sidebar() {
  const barLinks = [
    { name: "Add Service", href: '/dashboard/overview', icon: <LuPackagePlus size={30} className='text-[var(--primary-color)] ' /> },
    { name: "Appointment", href: '/dashboard/appointments', icon: <MdBathroom size={30} className='text-[var(--primary-color)] ' /> },
    { name: "Upload Blog", href: '/dashboard/uploadBlug', icon: <FaCloudUploadAlt size={30} className='text-[var(--primary-color)] ' /> },
    { name: "Create Package", href: '/dashboard/createPackage', icon: <IoIosCreate size={30} className='text-[var(--primary-color)] ' /> },
  ];

  return (
    <div className='relative '>
      <div className='h-screen bg-[var(--primary-color)]  w-30 rounded-tr-[20px] rounded-br-[20px] '>
        <div className='p-2 absolute top-25 left-4 '>
          {barLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className='flex flex-col gap-10 items-center justify-center mb-6 hover:bg-[var(--pink-color)] p-2 rounded-md transition-colors'
            >
              <div className='p-3 bg-white rounded-md'>
                {link.icon}
              </div>
              {/* <span className='text-xs font-medium text-[var(--primary-color)] mt-1'>{link.name}</span> */}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
