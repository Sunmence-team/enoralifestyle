import React, { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "../components/navs/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`w-screen h-screen parent ${
        isExpanded && "expand"
      } overflow-hidden flex items-start bg-[#901E76]/20`}
    >
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <main
        className={`transition-all duration-500 h-full overflow-y-auto no-scrollbar md:p-6 p-4 ${
          isExpanded
            ? "lg:w-[calc(80%)] md:w-[calc(100%-25%)] w-1/4"
            : "w-[calc(100%-80px)]"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
