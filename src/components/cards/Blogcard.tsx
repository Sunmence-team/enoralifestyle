import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
interface Blog {
  id?: number;
  title: string;
  description: string;
  image: string;
}

interface BlogCardProps {
  blog: Blog;
  index: number;
}
const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => (
  <div
    key={index}
    className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center border border-black/10 overflow-hidden"
  >
    {/* Text before image */}
    <div className="px-5 pt-6 text-start">
      <h2 className="text-[20px] font-semibold text-black mb-2">
        {blog.title}
      </h2>
      <p className="text-gray-600 text-sm">{blog.description}</p>
    </div>

    {/* Blog image with smooth concave bottom */}
    <div className="relative overflow-hidden p-5">
      <div className="wave-div z-1 rounded-t-3xl h-[300px] overflow-hidden mb-8">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <Link
        to={`/blog/${index + 1}`}
        className="text-[var(--primary-color)] font-semibold hover:text-black transition-colors text-center mt-4 pb-6 absolute z-99 bottom-0 left-1/2 -translate-x-1/2 flex items-center"
      >
        <span>Read more</span>
        <span className="flex mt-1">
          <GoChevronRight />
          <GoChevronRight />
          <GoChevronRight />
        </span>
      </Link>
    </div>
  </div>
);

export default BlogCard;
