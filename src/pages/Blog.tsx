// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import BlogCrd from "../components/cards/BlogCrd";
import axios, { AxiosError } from "axios";
import BlogCardSkeleton from "../components/skeletons/BlogCardSkeleton";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Blog {
  id: number;
  title: string;
  short_description: string;
  cover_image: string | null;
  created_at: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const hasActiveFilters = fromDate || toDate;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog - Enora Lifestyle And Spa";
  }, []);

  // Fetch blogs with date filters
  const fetchBlogs = async (filters?: { from_date?: string; to_date?: string }) => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {};
      if (filters?.from_date) params.from_date = filters.from_date;
      if (filters?.to_date) params.to_date = filters.to_date;

      const response = await axios.get(`${API_URL}/blogs`, { params });

      if (response.status === 200) {
        const { data } = response.data.data;
        setBlogs(data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch blogs:", error);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleApplyFilters = () => {
    fetchBlogs({ from_date: fromDate, to_date: toDate });
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    fetchBlogs();
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <HeroSection
        title="Blogs"
        backgroundImage={assets.newblog}
        height="lg:h-[65vh] h-[40vh]"
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
            {/* From Date */}
            <div className="flex-1">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-5 py-3.5 text-base rounded-xl focus:outline-none focus:ring-2 transition"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--pink-color)",
                  color: "var(--accent-color)",
                }}
              />
            </div>

            {/* To Date */}
            <div className="flex-1">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-5 py-3.5 text-base rounded-xl focus:outline-none focus:ring-2 transition"
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

      {/* MAIN CONTENT */}
      <section className="py-16 lg:pt-20 px-5 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          {blogs.length > 0 && !loading && (
            <>
              <h1
                className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold mb-4"
                style={{ color: "var(--accent-color)" }}
              >
                Blog <span style={{ color: "var(--primary-color)" }}>News</span>
              </h1>
              <p className="text-center text-base sm:text-lg max-w-2xl mx-auto mb-12" style={{ color: "var(--accent-color)" }}>
                Discover skincare tips, beauty secrets, and wellness insights from our experts.
              </p>
            </>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-24">
              <p className="text-xl sm:text-2xl font-medium mb-6" style={{ color: "var(--cancelled-color)" }}>
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 rounded-xl text-white font-medium transition hover:opacity-90"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
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
                  ? "No blogs match your date range."
                  : "No blogs available at the moment."}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--accent-color)" }}>
                Check back soon for fresh content!
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm font-medium underline mt-3"
                  style={{ color: "var(--primary-color)" }}
                >
                  Clear filters and try again
                </button>
              )}
            </div>
          )}

          {/* Blog Grid */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <BlogCrd
                  key={blog.id}
                  id={String(blog.id)}
                  title={blog.title}
                  description={blog.short_description}
                  image={`${IMAGE_URL}/${blog.cover_image}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;