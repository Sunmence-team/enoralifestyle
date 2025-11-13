import React from 'react'
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight  } from "react-icons/fa6";

export default function DashboardTable() {
    const appointments = [
        {
            name: 'Mella Wuraola',
            email: 'mella01@gmail.com',
            service: 'Manicure and Pedicure',
            time: '10:00 AM',
            date: '19/09/25',
            status: 'Completed',
        },
        {
            name: 'Mella Wuraola',
            email: 'mella01@gmail.com',
            service: 'Manicure and Pedicure',
            time: '10:00 AM',
            date: '19/09/25',
            status: 'Cancelled',
        },
        {
            name: 'Mella Wuraola',
            email: 'mella01@gmail.com',
            service: 'Manicure and Pedicure',
            time: '10:00 AM',
            date: '19/09/25',
            status: 'Pending',
        },
        {
            name: 'Mella Wuraola',
            email: 'mella01@gmail.com',
            service: 'Manicure and Pedicure',
            time: '10:00 AM',
            date: '19/09/25',
            status: 'Cancelled',
        },
        {
            name: 'Mella Wuraola',
            email: 'mella01@gmail.com',
            service: 'Manicure and Pedicure',
            time: '10:00 AM',
            date: '19/09/25',
            status: 'Completed',
        },
    ]

    return (
        <div className=" w-full flex flex-col items-center py-4 px-">
            {/* Table container */}
            <div className="bg-white rounded-xl shadow-sm w-full max-w- overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-600 border-b">
                            <th className="py-3 px-6">NAME</th>
                            <th className="py-3 px-6">EMAIL</th>
                            <th className="py-3 px-6">SERVICE</th>
                            <th className="py-3 px-6">TIME</th>
                            <th className="py-3 px-6">DATE</th>
                            <th className="py-3 px-6">STATUS</th>
                            <th className="py-3 px-6 text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr
                                key={index}
                                className={`border-b hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--light-primary)]'} `}
                            >
                                <td className="py-4 px-6">{appt.name}</td>
                                <td className="py-4 px-6">{appt.email}</td>
                                <td className="py-4 px-6">{appt.service}</td>
                                <td className="py-4 px-6">{appt.time}</td>
                                <td className="py-4 px-6 text-[var(--primary-color)] font-semibold">
                                    {appt.date}
                                </td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`${appt.status === 'Completed' ? 'bg-(--another-green) text-[var(--completed-color)] p-1 rounded-md pr-2 pl-2 ' :
                                        appt.status === 'Cancelled' ? 'bg-(--transparent-red) text-[var(--cancelled-color)] p-1 pr-2 pl-2  rounded-md' :
                                            appt.status === 'Pending' ? 'bg-(--pending-bg) text-[var(--pending-color)] p-1 pr-2 pl-2  rounded-md' : ''

                                    }`}
                                    >
                                        {appt.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex justify-center space-x-5 text-[var(--primary-color)]">
                                        <FaEye className="cursor-pointer hover:text-blue-600" />
                                        <FaEdit className="cursor-pointer hover:text-green-600" />
                                        <FaTrash className="cursor-pointer hover:text-red-600" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-4 mt-3">
                <button className="p-2 text-gray-600 hover:text-black"><FaAngleLeft /></button>
                <button className="w-8 h-8 flex items-center justify-center font-bold bg-[var(--primary-color)] text-white rounded-lg">
                    1
                </button>
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-lg">
                    2
                </button>
                <button className="w-8 h-8 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-200 rounded-lg">
                    3
                </button>
                <span className="text-gray-500">...</span>
                <button className="p-2 text-gray-600 hover:text-black"><FaAngleRight /></button>
            </div>
        </div>
    )
}
