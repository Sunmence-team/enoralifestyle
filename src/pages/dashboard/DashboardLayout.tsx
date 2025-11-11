import React from "react";
import type { ReactNode } from "react";
import Sidebar from "../../components/navs/Sidebar";
// import { Outlet } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { useState, useEffect } from 'react'

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  const [menu, setMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      if (mobile) {
        setMenu(false)
      }
    }
    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobile && menu && !target.closest('.sidebar')) {
        setMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, menu]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenu(!menu)
  }

  return (
    <div className="flex min-h-screen w-full bg-[#C97BB74D] ">
      <div className="fixed z-30 top-0 w-full h-14 py-2 px-2.5 sm:py-5 sm:px-6 md:px-12 xl:px-24 bg- md:hidden ">
        <div className="flex  sm:gap-5">
          <RiMenu2Line onClick={toggleMenu} className="text-black md:hidden size-5 sm:size-8 cursor-pointer " />
        </div>
      </div>

      {/* SideBar */}
      {!isMobile || menu ? (
        <div className="fixed md:sticky top-0 left-0 h-screen z-50 ">
          <Sidebar />
        </div>
      ) : ''}


      {/* Main Content (adds top padding to clear navbar height) */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
        {/* <Outlet /> */}
      </main>

    </div>
  );
};

export default DashboardLayout;
