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

const Packages : React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Packages - Enora Lifestyle And Spa";
  }, []);

  // FETCH ALL PACKAGES FROM API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        console.log("response", response);

        if (response.status === 200) {
          const { data } = response.data.data;
          setPackages(data);
        }

        // Filter only packages and sort by latest
        // const sorted = rawData
        //   .filter((item: any) => item.type === "package")
        //   .sort((a: Package, b: Package) =>
        //     new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        //   );

        // setPackages(sorted);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Failed to load packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

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
          <div className="text-center py-12 relative">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
              <div className="absolute">
                <p className="text-xl text-gray-600 font-medium">
                  No packages available at the moment.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {packages.map((item, index) => (
              <PackageCard
                id={item?.id.toString()}
                index={index}
                title={item?.name}
                description={item?.description}
                price={item?.price}
                image={`${IMAGE_URL}/${item?.image}`}
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