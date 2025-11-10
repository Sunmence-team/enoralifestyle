import React from "react";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    button1Text?: string;
    button2Text?: string;
    backgroundImage: string;
    height?: string; // e.g. "h-[90vh]" or "h-[70vh]"
}

const Packagehero: React.FC<HeroSectionProps> = ({
    title,
    backgroundImage,
    height = "h-[30vh]",
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

            </div>
        </div>
    );
};

export default Packagehero;
