import React, { useState } from "react";
// import Bloghero from '../components/Bloghero'
import { assets } from "../assets/assests";
// import Blogpost from '../components/Blogpost';
import { Link } from "react-router-dom";
import HeroSection from "../components/herosections/Herosection";
import BlogCard from "../components/cards/BlogCard";
import BlogCardSkeleton from "../components/skeletons/BlogCardSkeleton";
import type { blogProps } from "../utilities/sharedInterFaces";

export default function Blog() {
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogs, setBlogs] = useState<blogProps[]>([]);
  return (
    <div>
      <HeroSection
        title="Blogs"
        backgroundImage={assets.newblog}
        height="lg:h-[65vh] h-[35vh]"
      />
      <div className="bg-white mt-16 lg:px-10 px-5">
        <h1 className="md:text-[48px] text-[30px] text-center font-semibold">
          Blog <span className="text-(--primary-color)">News</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingBlogs
            ? [1, 2, 3, 4].map((b, index) => <BlogCardSkeleton key={index} />)
            : blogs.length === 0
            ? ""
            : blogs.map((blog, index) => (
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
