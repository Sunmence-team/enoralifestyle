// src/pages/Packages.tsx
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import { FiX } from "react-icons/fi";
import PackageCard from "../components/cards/PackageCard";
import axios from "axios";
import PackageCardSkeleton from "../components/skeletons/PackageCardSkeleton";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = (import.meta.env.VITE_IMAGE_BASE_URL || "").replace(/\/?$/, "/");

interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  created_at: string;
  type: "package" | "service";
}

interface SelectedPackage {
  title: string;
  description: string;
  price: string;
  image: string;
}

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setlastPage] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Packages - Enora Lifestyle And Spa";
  }, []);

  // FETCH ALL PACKAGES FROM API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${API_URL}/packages`);
        const rawData = res.data.data?.data || [];

        // Filter only packages and sort by latest
        // const sorted = rawData
        //   .filter((item: any) => item.type === "package")
        //   .sort((a: Package, b: Package) =>
        //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        //   );

        // setPackages(sorted);
      } catch (err) {
        console.error("Failed to load packages:", err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Open modal with selected package
  const openModal = (pkg: Package) => {
    setSelectedPackage({
      title: pkg.name,
      description: pkg.description,
      price: pkg.price,
      image: pkg.image ? `${IMAGE_URL}${pkg.image.replace(/^public\//, "")}` : assets.our1,
    });
  };

  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Our Packages"
        backgroundImage={assets.pac}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* PACKAGES GRID */}
      <div className="mt-20 lg:px-10 px-5">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {Array(9).fill(0).map((_, index) => (
              <div className="w-full" key={index}>
                <PackageCardSkeleton />
              </div>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No packages available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {packages.map((item, index) => (
              <div key={item?.id} onClick={() => openModal(item)} className="cursor-pointer">
                <PackageCard
                  id={item?.id.toString()}
                  index={index}
                  title={item?.name}
                  description={item?.description}
                  price={parseFloat(item?.price)}
                  image={`${IMAGE_URL}/${item?.image}`}
                  showMidLine={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-5">
          <div className="bg-white rounded-3xl max-w-lg w-full relative shadow-2xl overflow-hidden animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            {/* Modal Content */}
            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full h-[300px] object-cover rounded-t-3xl"
            />

            <div className="p-6">
              <h2 className="text-[24px] font-semibold text-black mb-2">
                {selectedPackage.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedPackage.description}
              </p>
              <p className="mt-4 text-[20px] font-semibold text-black/80">
                Price:{" "}
                <span className="text-[var(--primary-color)]">
                  ₦{Number(selectedPackage.price).toLocaleString()}
                </span>
              </p>

              <div className="mt-6 flex justify-end">
                {/* Optional: Add "Book Now" button later */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;