import React, { useEffect } from 'react'
import { IoSearch } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import DashboardTable from './DashboardTable';
// import { IoSearch } from "react-icons/io5";

export default function Appointments() {

  const [filter, setFilter] = React.useState('')
  const [search, setSearch] = React.useState('')

  const [totalAppointment, setTotalAppointment] = React.useState('125')
  const [pending, setPending] = React.useState('15')
  const [completed, setCompleted] = React.useState('90')
  const [Cancelled, setCancelled] = React.useState('20')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('')
      const data = await res.json()

      setTotalAppointment(data.totalAppointment)
      setPending(data.pending)
      setCompleted(data.completed)
      setCancelled(data.cancelled)
    }

    fetchData();

    const fetchInterval = setInterval(fetchData, 10000)
    return () => clearInterval(fetchInterval);

  }, [])

  return (
    <div className='w-full flex flex-col space-y-3'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='font-bold text-2xl'>Add Sercice</h2>
        </div>

        <div className='flex space-x-3'>

          <div className='flex gap-2'>
            <div className="flex items-center border rounded-full p-2 md:border-[var(--primary-color)]/30 bg-white ">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hidden md:flex flex-1 outline-none px-1 bg-transparent"
              />
              <IoSearch size={20} className="text-gray-500" />
            </div>

            <div className="flex items-center border rounded-full p-2 md:border-[var(--primary-color)]/30 bg-white">
              <input
                type="text"
                placeholder="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="hidden md:flex flex-1 outline-none px-1 bg-transparent"
              />
              <MdFilterList size={20} className="text-gray-500" />
            </div>
          </div>

          <div className='flex gap-3'>
            <div className='p-3 rounded-full bg-[var(--pink-color)] '><IoIosNotifications size={25} className='text-[var(--primary-color)]' /></div>
            <div className='p-3 rounded-full bg-[var(--pink-color)]'><FaRegUserCircle size={25} className='text-[var(--primary-color)]' /></div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-3'>
        <div className='bg-[var(--primary-color)] text-white p-6 rounded-xl flex flex-col items-start justify-center h-26'>
          <span className='text-sm'>Total Appointment</span>
          <p className='text-2xl font-[Raleway]! font-bold!'>{totalAppointment}</p>
        </div>

        <div className='bg-[#ffff] p-6 rounded-xl flex flex-col items-start justify-center h-26'>
          <span className='text-sm text-gray-500'>Pending</span>
          <p className='text-2xl font-[Raleway]! font-bold! text-[#00382B]'>{pending}</p>
        </div>

        <div className='bg-[var(--color-green)] p-6 rounded-xl flex flex-col items-start justify-center h-26'>
          <span className='text-sm text-black'>Completed</span>
          <p className='text-2xl font-[Raleway]! font-bold! text-black'>{completed}</p>
        </div>

        <div className='bg-[var(--cancelled-color)] p-6 rounded-xl flex flex-col items-start justify-center h-26'>
          <span className='text-sm text-black'>Cancelled</span>
          <p className='text-2xl font-[Raleway]! font-bold! text-black'>{Cancelled}</p>
        </div>

      </div>
      <div>
        <DashboardTable />

      </div>


    </div>
  )
}
