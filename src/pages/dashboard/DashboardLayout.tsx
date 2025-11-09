import React from "react";
import type { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
// import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <div className="flex min-h-screen w-full bg-[#C97BB74D] ">
      {/* SideBar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content (adds top padding to clear navbar height) */}
      <main className="flex-1 p-8">
        {children}
        {/* <Outlet /> */}
      </main>

    </div>
  );
};

export default DashboardLayout;
