import React from "react";
import { LuPackagePlus } from "react-icons/lu";
import { FaCloudUploadAlt, FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GrContract, GrExpand } from "react-icons/gr";
import { assets } from "../../assets/assests";
import { MessageSquareMore } from "lucide-react";
import { FaClipboardUser } from "react-icons/fa6";
import { BiBox } from "react-icons/bi";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const barLinks = [
    {
      name: "Appointments",
      href: "/dashboard/appointments",
      icon: <FaClipboardUser />,
    },
    {
      name: "Manage Services",
      href: "/dashboard/services",
      icon: <LuPackagePlus />,
    },
    {
      name: "Manage Packages",
      href: "/dashboard/package",
      icon: <BiBox />,
    },
    {
      name: "Upload Blog",
      href: "/dashboard/blogUpload",
      icon: <FaCloudUploadAlt />,
    },
    {
      name: "Manage Contact",
      href: "/dashboard/contacts",
      icon: <MessageSquareMore/>,
    },
    {
      name: "Upload Testimonial",
      href: "/dashboard/testimonial",
      icon: <FaInfoCircle/>,
    },
  ];

  return (
    <div
      className={`transition-all duration-500 left-nav relative ${
        isExpanded ? "w-64" : "md:w-20 w-0"
      } rounded-r-4xl h-full bg-(--primary-color) pt-4 pb-8 px-2 flex items-center flex-col gap-4`}
    >
      <button
        type="button"
        className="absolute top-2 -right-4 w-8 h-8 flex justify-center items-center text-white bg-inherit border-2 rounded-full cursor-pointer shadow-lg"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? <GrContract /> : <GrExpand />}
      </button>
      <img
        src={assets.logo}
        alt="Enora Lifestyle and Spa Logo"
        className="w-16 h-16 object-cover"
      />
      <div className="w-full flex flex-col gap-2.5 border-b border-white/30 h-[calc(100%-(24px+3rem))] overflow-y-auto no-scrollbar">
        {barLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            title={link.name}
            aria-label={link.name}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "bg-white text-(--primary-color)" : "text-white"
              } ${
                isExpanded ? "rounded-sm" : "rounded-md"
              } flex justify-start text-2xl items-center gap-3 px-3 w-3/4 overflow-hidden mx-auto h-11 hover:text-(--primary-color) hover:bg-white transition-all duration-300`
            }
          >
            <div className="-ml-.5 -mt-.5">{link.icon}</div>
            <span
              className={`text-sm font-semibold! whitespace-nowrap font-[inter]! ${
                isExpanded ? "" : ""
              }`}
            >
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
