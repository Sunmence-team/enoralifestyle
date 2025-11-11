import React, { useEffect } from "react";
import HeroSection from "../components/herosections/Herosection";
import { assets } from "../assets/assests";
import ServiceCard from "../components/cards/ServiceCard";

const Services = () => {

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "Services - Enora Lifestyle And Spa";
  }, [])

  const services = [
    {
      id: "1",
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: 30_000,
      image: assets.ser1,
    },
    {
      id: "2",
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: 35_000,
      image: assets.ser2,
    },
    {
      id: "3",
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: 40_000,
      image: assets.ser3,
    },
    {
      id: "4",
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: 30_000,
      image: assets.ser1,
    },
    {
      id: "5",
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: 35_000,
      image: assets.ser2,
    },
    {
      id: "6",
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: 40_000,
      image: assets.ser3,
    },
    {
      id: "7",
      title: "Soaks & Bath",
      description:
        "Choose from options like lavender/green tea/oat/goat milk etc. Please check whatsapp link for detailed options.",
      price: 30_000,
      image: assets.ser1,
    },
    {
      id: "8",
      title: "Cupping Massage Therapy",
      description:
        "This massage is ideal for pain management, improves blood circulation, relieves tension and promotes healing.",
      price: 35_000,
      image: assets.ser2,
    },
    {
      id: "9",
      title: "Blissful Me",
      description: "Treatments include Pedicure/Manicure with Swedish Massage.",
      price: 40_000,
      image: assets.ser3,
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Services"
        backgroundImage={assets.servicehero}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* SERVICES GRID */}
      <div className="mt-20 lg:px-10 px-5">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {services.map((item, index) => (
            <ServiceCard 
              id={item.id}
              index={index}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      
    </div>
  );
};

export default Services;
