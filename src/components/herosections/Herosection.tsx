import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  button1Text?: string;
  button2Text?: string;
  backgroundImage: string;
  height?: string; // e.g. "h-[90vh]" or "h-[70vh]"
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
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl mb-6 text-gray-200">{subtitle}</p>
        )}
        <div className="flex justify-center gap-4">
          {button1Text && (
            <button className="bg-[#a1007e] text-white px-6 py-2 rounded-full hover:bg-[#820065] transition">
              {button1Text}
            </button>
          )}
          {button2Text && (
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
              {button2Text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
