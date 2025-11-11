import React from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  button1Text?: string;
  button2Text?: string;
  backgroundImage: string;
  height?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  button1Text,
  button2Text,
  backgroundImage,
  height = "h-[70vh]",
}) => {
  return (
    <div
      className={`relative flex items-center justify-center text-center text-white ${height}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-semibold! leading-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[14px] md:text-base mb-6 text-white">
            {subtitle}
          </h5>
        )}
        <div className="flex justify-center gap-4">
          {button1Text && (
            <Link className="bg-[#a1007e] text-white px-10 py-2 rounded-full hover:bg-[#820065] transition cursor-pointer">
              {button1Text}
            </Link>
          )}
          {button2Text && (
            <Link
              to="/services"
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition cursor-pointer"
            >
              {button2Text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
