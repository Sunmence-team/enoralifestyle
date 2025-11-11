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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all blogs – Public API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}blogs`);
        const data = response.data?.data?.data || response.data?.data || [];
        setBlogs(Array.isArray(data) ? data : []);
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
      <div className="bg-white mt-16 lg:px-10 px-5">
      <h1 className="md:text-[48px] text-[30px] text-center font-semibold">
        Blog <span className="text-(--primary-color)">News</span>
      </h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div className="md:min-w-[340px] min-w-[320px]" key={index}>
            <BlogCard
              id={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
