import React from 'react'
// import Bloghero from '../components/Bloghero'
import { assets } from "../assets/assests";
// import Blogpost from '../components/Blogpost';
import { Link } from "react-router-dom";
import HeroSection from "../components/herosections/Herosection";
import BlogCard from '../components/cards/BlogCard';

const blogs = [
  {
    id: "1",
    title: "Anti-Aging Facials: Do They Really Make You Look Younger?",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog1,
  },
  {
    id: "2",
    title: "Why Your Skin Isn’t Glowing, 5 Mistakes to Avoid",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog2,
  },
  {
    id: "3",
    title: "Why Self-Care Is Not a Luxury but a Necessity",
    description:
      "You need your face to be amazing and lovely and you need to read this blog to get better abeg",
    image: assets.blog3,
  },
];

export default function Blog() {
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
};
