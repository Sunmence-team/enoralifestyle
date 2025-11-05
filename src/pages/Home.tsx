import React from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";

const Home = () => {
  return (
    <div>
      <HeroSection
        title="Premium Spa Experience Designed for You"
        subtitle="Relax, recharge, and renew with spa treatments tailored to your body, beauty, and wellness needs."
        button1Text="Book Now"
        button2Text="View Services"
        backgroundImage={assets.hero}
        height="h-[100vh]" // home page is taller
      />

      {/* Other Home Sections */}
    </div>
  );
};

export default Home;
