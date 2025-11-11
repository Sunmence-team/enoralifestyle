// src/pages/Services.tsx
import React, { useEffect, useState } from "react";
import HeroSection from "../components/herosections/Herosection";
import { assets } from "../assets/assests";
import ServiceCard from "../components/cards/ServiceCard";
import axios from "axios";
import ServiceCardSkeleton from "../components/skeletons/ServiceCardSkeleton";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  created_at: string;
  type: "service" | "package"; // Add type field
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services - Enora Lifestyle And Spa";
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);

        console.log("response", response);
        if (response.status === 200) {
          const { data, current_page, last_page } = response.data.data;
          setServices(data);
          setCurrentPage(current_page);
          setlastPage(last_page);
        }

        // const sorted = rawData
        //   .filter((item: any) => item.type === "service")
        //   .sort((a: Service, b: Service) =>
        //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        //   );

        // setServices(sorted);
      } catch (err) {
        console.error("Failed to load services:", err);
        setServices([]);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchServices();
  }, []);

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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {services.map((item, index) => (
              <ServiceCard
                key={item.id}
                id={item.id.toString()}
                index={index}
                title={item.name}
                price={parseFloat(item.price)}
                description={item.description}
                image={`${IMAGE_URL}/${item.image}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
