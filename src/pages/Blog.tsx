
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import BlogCard from "../components/cards/Blogcard"; // 👈 import your new component

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
          Blog{" "}
          <span className="text-[var(--primary-color)]">
            News
          </span>
        </h1>

        {/* Blog Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
