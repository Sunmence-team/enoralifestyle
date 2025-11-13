// src/pages/Packages.tsx
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import PackageCard from "../components/cards/PackageCard";
import axios, { AxiosError } from "axios";
import PackageCardSkeleton from "../components/skeletons/PackageCardSkeleton";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  created_at: string;
  type: "package" | "service";
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const hasActiveFilters = search || minPrice || maxPrice;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Packages - Enora Lifestyle And Spa";
  }, []);

  // Fetch packages with filters
  const fetchPackages = async (filters?: { search?: string; min_price?: string; max_price?: string }) => {
    try {
      setLoading(true);

      const params: any = {};
      if (filters?.search?.trim()) params.search = filters.search.trim();
      if (filters?.min_price) params.min_price = filters.min_price;
      if (filters?.max_price) params.max_price = filters.max_price;

      const response = await axios.get(`${API_URL}/packages`, { params });

      if (response.status === 200) {
        const { data } = response.data.data;
        setPackages(data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to load packages:", error);
      setPackages([]);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPackages();
  }, []);

  const handleApplyFilters = () => {
    fetchPackages({ search, min_price: minPrice, max_price: maxPrice });
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    fetchPackages();
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Our Packages"
        backgroundImage={assets.pac}
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
                placeholder="Search packages..."
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
                    color: "var(--primary-color)",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PACKAGES GRID */}
      <div className="mt-12 lg:px-10 px-5 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div className="w-full" key={i}>
                  <PackageCardSkeleton />
                </div>
              ))}
          </div>
        ) : packages.length === 0 ? (
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
                ? "No packages match your filters."
                : "No packages available at the moment."}
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
            {packages.map((item, index) => (
              <PackageCard
                key={item.id}
                id={item.id.toString()}
                index={index}
                title={item.name}
                description={item.description}
                price={item.price}
                image={`${IMAGE_URL}/${item.image}`}
                showMidLine={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;