import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";

const blogs = [
  {
    id: 1,
    title: "Anti-Aging Facials: Do They Really Make You Look Younger?",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog1,
  },
  {
    id: 2,
    title: "Why Your Skin Isn’t Glowing, 5 Mistakes to Avoid",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog2,
  },
  {
    id: 3,
    title: "Why Self-Care Is Not a Luxury but a Necessity",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog3,
  },
];

const Blog = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <HeroSection
        title="Blogs"
        backgroundImage={assets.newblog}
        height="lg:h-[65vh] h-[35vh]"
      />
      <div className="bg-white mt-16 lg:px-10 px-5">
      <h1 className="md:text-[48px] text-[30px] text-center font-semibold">
        Blog <span className="text-(--primary-color)">News</span>
      </h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col text-center border border-black/10 overflow-hidden"
          >
            {/* Text before image */}
            <div className="px-5 pt-6 text-start">
              <h2 className="text-[20px] font-semibold text-black mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
            </div>

            {/* Blog image with smooth concave bottom */}
            <div className="relative overflow-hidden border-4 border-red-600 p-5">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[300px] object-cover rounded-t-3xl border"
              />

              {/* Smooth concave curve */}
              {/* <svg
                className="absolute inset-x-0 bottom-0 w-full h-16 fill-amber-700"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,0 Q600,70 1200,0 L1200,120 L0,120 Z" fill="red" />
              </svg> */}
            </div>

            {/* Read more link */}
            <Link
              to={`/blog/${blog?.id}`}
              className="text-[var(--primary-color)] font-semibold hover:text-black transition-colors block text-center mt-4 pb-6"
            >
              Read more &gt;&gt;&gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Blog;
