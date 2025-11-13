import { useEffect, useState } from "react";
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
  type: "service" | "package";
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const hasActiveFilters = search || minPrice || maxPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Services - Enora Lifestyle And Spa";
  }, []);

  const fetchServices = async (filters?: { search?: string; min_price?: string; max_price?: string }) => {
    try {
      setLoading(true);

      const params: any = {};
      if (filters?.search?.trim()) params.search = filters.search.trim();
      if (filters?.min_price) params.min_price = filters.min_price;
      if (filters?.max_price) params.max_price = filters.max_price;

      const response = await axios.get(`${API_URL}/services`, { params });

      if (response.status === 200) {
        const { data } = response.data.data;
        setServices(data);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
      setServices([]);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleApplyFilters = () => {
    fetchServices({ search, min_price: minPrice, max_price: maxPrice });
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    fetchServices();
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Services"
        backgroundImage={assets.servicehero}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* FILTER BAR - BRANDED & RESPONSIVE */}
      <div className="mt-12 px-5 lg:px-10">
        <div
          className="rounded-2xl p-5 md:p-6 shadow-sm border"
          style={{
            backgroundColor: "var(--secondary-color)",
            borderColor: "var(--pink-color)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3.5 text-base rounded-xl focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--pink-color)",
                  color: "var(--accent-color)",
                }}
              />
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-28 px-4 py-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--pink-color)",
                  color: "var(--accent-color)",
                }}
              />
              <span className="text-gray-500 hidden sm:inline">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-28 px-4 py-3.5 text-sm rounded-xl focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--pink-color)",
                  color: "var(--accent-color)",
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 lg:ml-auto">
              <button
                onClick={handleApplyFilters}
                className="px-6 py-3.5 font-medium rounded-xl text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
              >
                Apply Filters
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3.5 font-medium rounded-xl border transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    borderColor: "var(--pink-color)",
                    color: "var(--primary-color)"
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="mt-12 lg:px-10 px-5 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "var(--light-primary)" }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  style={{ stroke: "var(--accent-color)" }}
                />
              </svg>
            </div>
            <p className="text-lg font-medium mb-2" style={{ color: "var(--accent-color)" }}>
              {hasActiveFilters
                ? "No services match your filters."
                : "No services available at the moment."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm font-medium underline mt-2"
                style={{ color: "var(--primary-color)" }}
              >
                Clear filters and try again
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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