// src/pages/Blog.tsx
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import BlogCard from "../components/cards/BlogCard";
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs`);
        // console.log("response", response)
        if (response.status === 200) {
          const { data } = response.data.data;
          setBlogs(data);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error("Failed to fetch blogs:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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
      <section className="bg-white py-16 lg:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          {
            blogs.length > 0 && (
              <>
                <h1 className="text-center font-semibold! text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-gray-900 mb-4">
                  Blog <span className="text-(--primary-color) font-inherit">News</span>
                </h1>
                <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12">
                  Discover skincare tips, beauty secrets, and wellness insights from our experts.
                </p>
              </>
            )
          }

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {
                Array(18).fill(0).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))
              }
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
            <div className="text-center pt-16 relative">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                <div className="absolute">
                  <p className="text-xl text-gray-600 font-medium">
                    No blogs available at the moment.
                  </p>
                  <p className="text-gray-500 mt-2">Check back soon for fresh content!</p>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid – Ultra Responsive */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={String(blog.id)}
                  title={blog.title}
                  description={blog.short_description}
                  image={`${IMAGE_URL}/${blog?.cover_image}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;