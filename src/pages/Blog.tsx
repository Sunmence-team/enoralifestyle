// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import BlogCard from "../components/cards/BlogCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface Blog {
  id: number;
  title: string;
  short_description: string;
  cover_image: string | null;
  created_at: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all blogs – Public API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs`);
        console.log("response", response)
        if (response.status === 200) {
          const { data, current_page, last_page } = response.data.data;
          setBlogs(data);
          setCurrentPage(current_page);
          setLastPage(last_page);
        }
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <HeroSection
        title="Blogs"
        backgroundImage={assets.newblog}
        height="lg:h-[65vh] h-[40vh]"
      />

      {/* MAIN CONTENT */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-center font-semibold! text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-gray-900 mb-4">
            Blog <span className="text-(--primary-color) font-inherit">News</span>
          </h1>
          <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
            Discover skincare tips, beauty secrets, and wellness insights from our experts.
          </p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-32">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-24">
              <p className="text-xl sm:text-2xl text-red-600 font-medium mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">Document</span>
              </div>
              <p className="text-xl text-gray-600 font-medium">
                No blogs available at the moment.
              </p>
              <p className="text-gray-500 mt-2">Check back soon for fresh content!</p>
            </div>
          )}

          {/* Blog Grid – Ultra Responsive */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-sm">
                    <BlogCard
                      id={String(blog.id)}
                      title={blog.title}
                      description={
                        blog.short_description || "Discover amazing skincare insights and tips."
                      }
                      image={
                        blog.cover_image
                          ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`
                          : assets.blog1
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
